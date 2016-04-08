import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import config from 'config/client'

import {
  SHOW_HEADER,
  HIDE_HEADER,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL
} from 'redux/constants/global'

const initialState = Immutable.fromJS({
  ...config,
  showHeader: true,
  showLoginModal: false
})

export default handleActions({
  [SHOW_HEADER]: state => {
    return state.set('showHeader', true)
  },
  [HIDE_HEADER]: state => {
    return state.set('showHeader', false)
  },
  [SHOW_LOGIN_MODAL]: state => {
    return state.set('showLoginModal', true)
  },
  [HIDE_LOGIN_MODAL]: state => {
    return state.set('showLoginModal', false)
  }
}, initialState)
