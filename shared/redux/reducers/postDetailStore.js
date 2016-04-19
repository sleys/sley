import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import {
  POST_LOAD,
  POST_LIKE,
  POST_DOWN,
  POST_UNLIKE,
  POST_UNDOWN,
  CREATE_COMMENT,
  LOAD_COMMENTS
} from 'redux/constants/postDetail'

const initialState = Immutable.fromJS({
  post: {},
  loading: true,
  comments: [],
  fetchCommnets: false
})

export default handleActions({
  [POST_LOAD.REQUEST]: (state) => {
    return state.set('loading', true)
  },
  [POST_LOAD.SUCCESS]: (state, { payload }) => {
    return state.set('loading', false)
                .set('post', Immutable.Map(payload.post))
  },
  [POST_LOAD.FAILURE]: (state, { payload }) => {
    return state.set('loading', false)
  },
  [POST_LIKE.SUCCESS]: (state, { payload }) => {
    const { like, user_id } = payload
    const post = state.get('post')
    return state.set('post', post.set('like', like)
                                 .set('likes', Immutable.List(post.get('likes')).push(user_id)))
  },
  [POST_UNLIKE.SUCCESS]: (state, { payload }) => {
    const { user_id } = payload
    const post = state.get('post')
    const index = post.get('likes').findIndex(user => user_id === user)
    return state.set('post', post.set('likes', Immutable.List(post.get('likes')).delete(index))
                                 .set('like', post.get('like') - 1))
  },
  [POST_DOWN.SUCCESS]: (state, { payload }) => {
    const { down, user_id } = payload
    const post = state.get('post')
    return state.set('post', post.set('down', down)
                                 .set('downs', Immutable.List(post.get('downs')).push(user_id)))
  },
  [POST_UNDOWN.SUCCESS]: (state, { payload }) => {
    const { user_id } = payload
    const post = state.get('post')
    const index = post.get('downs').findIndex(user => user_id === user)
    return state.set('post', post.set('downs', Immutable.List(post.get('downs')).delete(index))
                                 .set('down', post.get('down') - 1))
  },
  [CREATE_COMMENT.SUCCESS]: (state, { payload }) => {
    const { comment } = payload
    return state.set('comments', Immutable.List(state.get('comments')).insert(0, Immutable.Map(comment)))
  },
  [LOAD_COMMENTS.REQUEST]: state => {
    return state.set('fetchCommnets', true)
  },
  [LOAD_COMMENTS.SUCCESS]: (state, { payload }) => {
    return state.set('fetchCommnets', false)
                .set('comments', Immutable.List(payload.comments))
  },
  [LOAD_COMMENTS.FAILURE]: (state, { payload }) => {
    return state.set('fetchCommnets', false)
  }
}, initialState)
