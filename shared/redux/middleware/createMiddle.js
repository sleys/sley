import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

export default (middle) => {
  const middles = [thunk, ...middle]

  if (__DEVELOPMENT__ && __CLIENT__) {
    const logger = createLogger({
      collapsed: true,
      stateTransformer: (state) => {
        if (state.toJS) {
          return state.toJS()
        }
        return state
      }
    })
    middles.push(logger)
  }

  return middles
}
