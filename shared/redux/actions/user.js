import {
  LOAD_USER_INFO,
  LOGIN,
  REGISTER,
  LOGOUT,
  FOLLOW,
  UNFOLLOW
} from 'redux/constants/user'
import { createAction } from 'redux-actions'
import {
  fetchProfile,
  fetchLogin,
  fetchSimilarYou,
  fetchRegister,
  followUser
} from 'api'
import cookie from 'react-cookie'
import { replace } from 'react-router-redux'

export const loginAction = {
  request: createAction(LOGIN.REQUEST),
  success: createAction(LOGIN.SUCCESS, (user, token) => ({user, token})),
  failure: createAction(LOGIN.FAILURE, e => e)
}

export const registerAction = {
  request: createAction(REGISTER.REQUEST),
  success: createAction(REGISTER.SUCCESS, (user, token) => ({user, token})),
  failure: createAction(REGISTER.FAILURE, e => e)
}

export const loadUserInfoAction = {
  success: createAction(LOAD_USER_INFO, (user, token) => ({user, token}))
}

export const login = (data, done) => {
  return dispatch => {
    dispatch(loginAction.request())
    return fetchLogin(data).then(({mate, response: {user, token}}) => {
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      cookie.save('token', token, {
        expires
      })
      dispatch(loginAction.success(user, token))
      dispatch(replace('/feeds'))
      done()
    }).catch(e => {
      dispatch(loginAction.failure(e))
      done(e)
    })
  }
}

export const register = (data, done) => {
  return dispatch => {
    dispatch(registerAction.request())
    return fetchRegister(data).then(({response: {user, token}}) => {
      dispatch(registerAction.success())
      done()
    }).catch(e => {
      dispatch(registerAction.failure(e))
      done(e)
    })
  }
}

// server side use this
export const loadUserInfo = (token) => {
  return dispatch => {
    return fetchProfile(token).then(({mate, response: {user}}) => {
      dispatch(loadUserInfoAction.success(user, token))
    }).catch((e) => {
      console.error(e)
    })
  }
}

// load similarYou
export const similarYou = () => {
  return (dispatch, getState) => {
    const token = getState().getIn(['UserStore', 'token'])
    return fetchSimilarYou(token).then(({response: {users}}) => {
      dispatch({
        type: 'LOAD_SIMILAR_SUCCESS',
        users
      })
    }).catch((e) => {
      console.error(e)
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({type: LOGOUT.SUCCESS})
    cookie.remove('token')
    dispatch(replace('/'))
  }
}

export const followAction = {
  request: createAction(FOLLOW.REQUEST),
  success: createAction(FOLLOW.SUCCESS, (follow_id, response) => ({follow_id, response})),
  failure: createAction(FOLLOW.FAIlURE, error => ({error}))
}
export const unFollowAction = {
  request: createAction(UNFOLLOW.REQUEST),
  success: createAction(UNFOLLOW.SUCCESS, (follow_id, response) => ({follow_id, response})),
  failure: createAction(UNFOLLOW.FAIlURE, error => ({error}))
}

export const follow = (follow_id, done) => {
  return (dispatch, getState) => {
    const token = getState().getIn(['UserStore', 'token'])
    dispatch(followAction.request())
    return followUser(follow_id, token).then(({response}) => {
      dispatch(followAction.success(follow_id, response))
      typeof done === 'function' && done()
    }).catch(e => {
      console.error(e)
      dispatch(followAction.failure(e))
    })
  }
}
export const unFollow = (follow_id, done) => {
  return (dispatch, getState) => {
    const token = getState().getIn(['UserStore', 'token'])
    dispatch(unFollowAction.request())
    return followUser(follow_id, token, true).then(({response}) => {
      dispatch(unFollowAction.success(follow_id, response))
      typeof done === 'function' && done()
    }).catch(e => {
      console.error(e)
      dispatch(unFollowAction.failure(e))
    })
  }
}
