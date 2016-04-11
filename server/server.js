import 'moment/locale/zh-cn'
import path from 'path'
import Koa from 'koa'
import staticCache from 'koa-static-cache'
import convert from 'koa-convert'
import compress from 'koa-compress'
import React from 'react'
import Helmet from 'react-helmet'
import { trigger } from 'redial'
import { renderToStaticMarkup } from 'react-dom/server'
import { syncHistoryWithStore } from 'react-router-redux'
import { RouterContext, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import createRoutes, { matchLocation } from 'routes'
import configureStore from 'redux/store'
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

const renderFullPage = (html, initialState, assets) => {
  let cssPath = ''
  let jsPath = 'http://localhost:4001/dist/js/bundle.js'
  if (!__DEVELOPMENT__) {
    cssPath = `<link rel='stylesheet' href='${assets.app.css}' />`
    jsPath = assets.app.js
  }
  const head = Helmet.rewind()
  return `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${head.title}
        ${head.meta}
        ${cssPath}
      </head>
      <body>
        <div id='app'>
          ${html}
        </div>
        <script>window.__INIT__STATE__ = ${JSON.stringify(initialState)};</script>
        <script src='${jsPath}'></script>
      </body>
    </html>
  `
}

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
      ctx.body = renderFullPage('', store.getState().toJS(), assetsFile)
      console.error(`Error: no renderProps url:${location}`)
      return
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
      const initialView = renderToStaticMarkup(
        <Provider store={store} key='provider'>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const finalState = store.getState().toJS()
      ctx.body = renderFullPage(initialView, finalState, assetsFile)
    }
  } catch (e) {
    console.error(`Error: MatchLocation error`)
    console.error(e)
    ctx.body = renderFullPage('', store.getState().toJS(), assetsFile)
    return
  }
})

app.listen(3000, 'localhost', () => {
  console.log('listen port is 3000')
})

app.on('error', (e, ctx) => {
  console.error(e)
  ctx.body = e
})
