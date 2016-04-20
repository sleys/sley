import 'moment/locale/zh-cn'
import React from 'react'
import { render } from 'react-dom'
import { trigger } from 'redial'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'redux/store'
import createRoutes, { matchLocation } from 'routes'

const dest = document.getElementById('app')
const store = configureStore(browserHistory, window.__INIT__STATE__)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get('routing')
})
const routes = createRoutes(store)

history.listen(location => {
  (async () => {
    const { renderProps } = await matchLocation(routes, location.pathname)

    // 我也不知道为什么会这样
    if (typeof renderProps === 'undefined') return

    // Get array of route handler components:
    const { components } = renderProps

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      // Allow lifecycle hooks to dispatch Redux actions:
      dispatch: store.dispatch,
      getState: store.getState
    }

    // Don't fetch data for initial route, server has already done the work:
    if (window.__INIT__STATE__) {
      // Delete initial data so that subsequent data fetches can occur:
      delete window.__INIT__STATE__
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      trigger('fetch', components, locals)
    }

    // Fetch deferred, client-only data dependencies:
    trigger('defer', components, locals)
  })()
})

const component = <Router history={history} routes={routes} />

render(
  <Provider key='provider' store={store}>
    {component}
  </Provider>, dest)

if (__DEVELOPMENT__) {
  // enable debugger
  window.React = React
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const Devtools = require('components/devtools')
  render(
    <Provider store={store} key='provider'>
      <div>
        {component}
        <Devtools />
      </div>
    </Provider>, dest)
}
