import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import {
  HOT_LOAD
} from 'redux/constants/hot'

const initialState = Immutable.fromJS({
  loaded: false,
  loading: false,
  error: '',
  hotPost: [],
  hotUser: []
})

export default handleActions({
  [HOT_LOAD.REQUEST]: (state, {payload}) => {
    return state.set('loading', true)
  },
  [HOT_LOAD.SUCCESS]: (state, {payload}) => {
    return state.set('loading', false)
                .set('loaded', true)
                .set('hotPost', Immutable.List(payload.hotPost.map(k => Immutable.Map(k))))
                .set('hotUser', Immutable.List(payload.hotUser.map(k => Immutable.Map(k))))
  },
  [HOT_LOAD.FAILURE]: (state, {payload}) => {
    return state.set('loading', false)
                .set('error', payload.error)
  }
}, initialState)
