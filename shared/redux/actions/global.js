import {
  SHOW_HEADER,
  HIDE_HEADER,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL
} from 'redux/constants/global'
import { createAction } from 'redux-actions'

export const showHeader = createAction(SHOW_HEADER)
export const hideHeader = createAction(HIDE_HEADER)

export const showLoginModal = createAction(SHOW_LOGIN_MODAL)
export const hideLoginModal = createAction(HIDE_LOGIN_MODAL)
