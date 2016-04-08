import 'moment/locale/zh-cn'
import path from 'path'
import Koa from 'koa'
import staticCache from 'koa-static-cache'
import convert from 'koa-convert'
import compress from 'koa-compress'
import React from 'react'
import { trigger } from 'redial'
import { renderToString } from 'react-dom/server'
import { syncHistoryWithStore } from 'react-router-redux'
import { RouterContext, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import createRoutes, { matchLocation } from 'routes'
import configureStore from 'redux/store'
import Html from 'html'
import {
  loadUserInfo
} from 'redux/actions/user'
let assetsFile = {}
if (!__DEVELOPMENT__) {
  assetsFile = require('../static/dist/assets.json')
}

const app = new Koa()

app.use(compress())
app.use(convert(staticCache(path.resolve(__dirname, '..', 'static'), {
  maxAge: 30 * 24 * 60 * 60
})))

app.use(async (ctx) => {
  const location = ctx.url
  const token = ctx.cookies.get('token')
  const memoryHistory = createMemoryHistory(location)
  const store = configureStore(memoryHistory)
  // sync History to Store
  syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.get('routing')
  })

  if (token) await store.dispatch(loadUserInfo(token))

  const routes = createRoutes(store)

  try {
    const { redirect, renderProps } = await matchLocation(routes, location)
    if (redirect) {
      ctx.redirect(redirect.pathname + redirect.search)
    } else if (!renderProps) {
      ctx.status = 500
      console.error('no renderProps')
    } else {
      const { components } = renderProps
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch: store.dispatch,
        getState: store.getState
      }
      await trigger('fetch', components, locals)
      const component = (
        <Provider store={store} key='provider'>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const html = '<!doctype html>\n' + renderToString(<Html store={store} component={component} assets={assetsFile} />)
      ctx.body = html
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = 'error'
    throw e
  }
})

app.listen(3000, 'localhost', () => {
  console.log('listen port is 3000')
})

app.on('error', (e, ctx) => {
  console.error(e)
  ctx.body = e
})
