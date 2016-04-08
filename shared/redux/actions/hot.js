import {
  HOT_LOAD
} from 'redux/constants/hot'
import { createAction } from 'redux-actions'
import {
  fetchHot
} from 'api'

export const hotActions = {
  request: createAction(HOT_LOAD.REQUEST),
  success: createAction(HOT_LOAD.SUCCESS, response => {
    return {
      hotPost: response.hotPost,
      hotUser: response.hotUser
    }
  }),
  failure: createAction(HOT_LOAD.FAILURE, error => error)
}

export const loadHot = () => {
  return (dispatch) => {
    dispatch(hotActions.request())
    return fetchHot().then(({response}) => {
      dispatch(hotActions.success(response))
    }).catch(e => {
      dispatch(hotActions.failure(e))
    })
  }
}
