import Immutable from 'immutable'
import { combineReducers } from 'redux-immutablejs'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import GlobalStore from './globalStore'
import PostStore from './postStore'
import UserStore from './userStore'
import HotStore from './hotStore'
import NodesStore from './nodesStore'
import PostDetailStore from './postDetailStore'

export function form (state = Immutable.fromJS({}), action) {
  return Immutable.fromJS(formReducer(state.toJS(), action))
}

const reducers = combineReducers({
  routing,
  GlobalStore,
  UserStore,
  PostStore,
  PostDetailStore,
  HotStore,
  NodesStore,
  form
})

export default reducers
