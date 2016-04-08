import {
  POST_LOAD,
  POST_LIKE,
  POST_DOWN,
  POST_UNLIKE,
  POST_UNDOWN,
  CREATE_COMMENT,
  LOAD_COMMENTS
} from 'redux/constants/postDetail'
import { createAction } from 'redux-actions'
import {
  fetchPost,
  createComment,
  fetchComments
} from 'api'
import {
  likeAndDown
} from './posts'

export const postLoadAction = {
  request: createAction(POST_LOAD.REQUEST),
  success: createAction(POST_LOAD.SUCCESS, response => {
    return {
      post: response.post
    }
  }),
  failure: createAction(POST_LOAD.FAILURE)
}

export const likeAction = {
  request: createAction(POST_LIKE.REQUEST),
  success: createAction(POST_LIKE.SUCCESS, (user_id, post_id, response) => {
    return {
      user_id,
      post_id,
      likes: response.likes,
      like: response.like
    }
  }),
  failure: createAction(POST_LIKE.FAILURE, error => ({ error }))
}

export const unLikeAction = {
  request: createAction(POST_UNLIKE.REQUEST),
  success: createAction(POST_UNLIKE.SUCCESS, (user_id, post_id, response) => {
    return {
      user_id,
      post_id,
      likes: response.likes,
      like: response.like
    }
  }),
  failure: createAction(POST_UNLIKE.FAILURE, error => ({ error }))
}

export const downAction = {
  request: createAction(POST_DOWN.REQUEST),
  success: createAction(POST_DOWN.SUCCESS, (user_id, post_id, response) => {
    return {
      user_id,
      downs: response.downs,
      down: response.down
    }
  }),
  failure: createAction(POST_DOWN.FAILURE, error => ({ error }))
}

export const unDownAction = {
  request: createAction(POST_UNDOWN.REQUEST),
  success: createAction(POST_UNDOWN.SUCCESS, (user_id, response) => {
    return {
      user_id,
      downs: response.downs,
      down: response.down
    }
  }),
  failure: createAction(POST_UNDOWN.FAILURE, error => ({ error }))
}

export const loadPost = post_id => {
  return (dispatch, getState) => {
    const token = getState().getIn(['UserStore', 'token'])
    dispatch(postLoadAction.request())
    return fetchPost(post_id, token).then(({response}) => {
      dispatch(postLoadAction.success(response))
    }).catch(e => {
      dispatch(postLoadAction.failure(e))
    })
  }
}

export const like = likeAndDown(likeAction, 'inc', 'like')
export const unLike = likeAndDown(unLikeAction, 'del', 'like')
export const closeLike = createAction(POST_UNLIKE.SUCCESS, (post_id, user_id) => ({post_id, user_id}))

export const down = likeAndDown(downAction, 'inc', 'down')
export const unDown = likeAndDown(unDownAction, 'del', 'down')
export const closeDown = createAction(POST_UNDOWN.SUCCESS, (post_id, user_id) => ({post_id, user_id}))

export const createCommentAction = {
  request: createAction(CREATE_COMMENT.REQUEST),
  success: createAction(CREATE_COMMENT.SUCCESS, comment => ({comment})),
  failure: createAction(CREATE_COMMENT.FAILURE, error => ({error}))
}

export const newComment = (comment, done) => {
  return (dispatch, getState) => {
    const token = getState().getIn(['UserStore', 'token'])
    dispatch(createCommentAction.request())
    return createComment(comment, token).then(({response}) => {
      dispatch(createCommentAction.success(response.comment))
      done()
    }).catch(e => {
      dispatch(createCommentAction.failure(e))
      done(e)
    })
  }
}

export const loadCommentsAction = {
  request: createAction(LOAD_COMMENTS.REQUEST),
  success: createAction(LOAD_COMMENTS.SUCCESS, comments => ({comments})),
  failure: createAction(LOAD_COMMENTS.FAILURE, error => ({error}))
}

export const loadComments = post_id => {
  return dispatch => {
    dispatch(loadCommentsAction.request())
    return fetchComments(post_id).then(({response}) => {
      dispatch(loadCommentsAction.success(response.comments))
    }).catch(e => {
      dispatch(loadCommentsAction.failure(e))
    })
  }
}
