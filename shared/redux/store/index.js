import Immutable from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { immutifyState } from 'utils'
import reducer from 'redux/reducers'
import createMiddle from 'redux/middleware/createMiddle'
import DevTools from 'components/devtools'

export default (history, initialState = {}) => {
  let finalCreateStore
  const reduxRouterMiddleware = routerMiddleware(history)
  let middle = createMiddle([reduxRouterMiddleware])

  if (__DEVTOOLS__ && __CLIENT__ && __DEVELOPMENT__) {
    const { persistState } = require('redux-devtools')
    finalCreateStore = compose(
      applyMiddleware(...middle),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
  } else {
    finalCreateStore = applyMiddleware(...middle)(createStore)
  }

  const state = Immutable.fromJS(immutifyState(initialState))
  const store = finalCreateStore(reducer, state)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
