import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import {
  NODES_LOAD
} from 'redux/constants/nodes'

const initialState = Immutable.fromJS({
  loaded: false,
  nodes: []
})

export default handleActions({
  [NODES_LOAD.SUCCESS]: (state, { payload }) => {
    return state.set('loaded', true)
                .set('nodes', Immutable.List(payload.nodes))
  }
}, initialState)
