import {
  NODES_LOAD
} from 'redux/constants/nodes'
import { createAction } from 'redux-actions'
import {
  fetchNodes
} from 'api'

export const nodesAction = {
  request: createAction(NODES_LOAD.REQUEST),
  success: createAction(NODES_LOAD.SUCCESS, response => {
    return {
      nodes: response.nodes
    }
  }),
  failure: createAction(NODES_LOAD.FAILURE)
}

export const loadNodes = (offset = 1) => {
  return dispatch => {
    dispatch(nodesAction.request())
    return fetchNodes(offset).then(({response}) => {
      dispatch(nodesAction.success(response))
    }).catch(e => {
      dispatch(nodesAction.failure(e))
    })
  }
}
