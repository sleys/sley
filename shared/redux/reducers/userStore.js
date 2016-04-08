import Immutable from 'immutable'
import {
  LOAD_USER_INFO,
  LOGIN,
  LOGOUT,
  FOLLOW,
  UNFOLLOW
} from 'redux/constants/user'
import { handleActions } from 'redux-actions'

const initialState = Immutable.fromJS({
  loading: false,
  login_message: '',
  logind: false,
  user: {},
  token: ''
})

export default handleActions({
  [LOAD_USER_INFO]: (state, { payload }) => {
    return state.set('logind', true)
                .set('user', Immutable.Map(payload.user))
                .set('token', payload.token)
  },
  [LOGIN.SUCCESS]: (state, { payload }) => {
    return state.set('loading', false)
                .set('user', Immutable.Map(payload.user))
                .set('token', payload.token)
                .set('logind', true)
                .set('login_message', '登录成功')
  },
  [LOGOUT.SUCCESS]: (state, { payload }) => {
    return initialState
  },
  [FOLLOW.SUCCESS]: (state, { payload }) => {
    const { follow_id } = payload
    return state.setIn(['user', 'following'], Immutable.List(state.getIn(['user', 'following'])).push(follow_id))
  },
  [UNFOLLOW.SUCCESS]: (state, { payload }) => {
    const { follow_id } = payload
    const index = state.getIn(['user', 'following']).findIndex(_id => _id === follow_id)
    return state.setIn(['user', 'following'], Immutable.List(state.getIn(['user', 'following'])).delete(index))
  }
}, initialState)
