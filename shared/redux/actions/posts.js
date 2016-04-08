import {
  POSTS_LOAD,
  POST_CREATE,
  NEXT_PAGE_LOAD,
  PREV_PAGE_LOAD,
  LIKE_POST,
  DOWN_POST,
  UNLIKE_POST,
  UNDOWN_POST
} from 'redux/constants/posts'
import { createAction } from 'redux-actions'
import {
  fetchPosts,
  fetchVoteLike,
  fetchVoteDown,
  createPost
} from 'api'

export const likeAction = {
  request: createAction(LIKE_POST.REQUEST, post_id => post_id),
  success: createAction(LIKE_POST.SUCCESS, (user_id, post_id, response) => {
    return {
      user_id,
      post_id,
      likes: response.likes,
      like: response.like
    }
  }),
  failure: createAction(LIKE_POST.FAILURE, (post_id, error) => { error })
}

export const unLikeAction = {
  request: createAction(UNLIKE_POST.REQUEST, post_id => post_id),
  success: createAction(UNLIKE_POST.SUCCESS, (user_id, post_id, response) => {
    return {
      user_id,
      post_id,
      likes: response.likes,
      like: response.like
    }
  }),
  failure: createAction(UNLIKE_POST.FAILURE, (post_id, error) => { error })
}

export const downAction = {
  request: createAction(DOWN_POST.REQUEST, post_id => post_id),
  success: createAction(DOWN_POST.SUCCESS, (user_id, post_id, response) => {
    return {
      user_id,
      post_id,
      downs: response.downs,
      down: response.down
    }
  }),
  failure: createAction(DOWN_POST.FAILURE, (post_id, error) => { error })
}

export const unDownAction = {
  request: createAction(UNDOWN_POST.REQUEST, post_id => post_id),
  success: createAction(UNDOWN_POST.SUCCESS, (user_id, post_id, response) => {
    return {
      user_id,
      post_id,
      downs: response.downs,
      down: response.down
    }
  }),
  failure: createAction(UNDOWN_POST.FAILURE, (post_id, error) => { error })
}

export const likeAndDown = (action, op, type) => {
  return (post_id) => {
    return (dispatch, getState) => {
      dispatch(action.request(post_id))
      const token = getState().getIn(['UserStore', 'token'])
      const userId = getState().getIn(['UserStore', 'user', '_id'])
      let c
      if (type === 'like') {
        c = fetchVoteLike
      } else if (type === 'down') {
        c = fetchVoteDown
      }
      return c(post_id, op, token).then(({response}) => {
        dispatch(action.success(userId, post_id, response))
      }).catch(e => {
        console.log(e)
        dispatch(action.failure(post_id, e))
      })
    }
  }
}

export const like = likeAndDown(likeAction, 'inc', 'like')
export const unLike = likeAndDown(unLikeAction, 'del', 'like')
export const closeLike = createAction(UNLIKE_POST.SUCCESS, (post_id, user_id) => ({post_id, user_id}))

export const down = likeAndDown(downAction, 'inc', 'down')
export const unDown = likeAndDown(unDownAction, 'del', 'down')
export const closeDown = createAction(UNDOWN_POST.SUCCESS, (post_id, user_id) => ({post_id, user_id}))

export const postsAction = {
  request: createAction(POSTS_LOAD.REQUEST),
  success: createAction(POSTS_LOAD.SUCCESS, response => {
    return {
      posts: response.posts,
      count: response.count,
      postsCount: response.postsCount
    }
  }),
  failure: createAction(POSTS_LOAD.FAILURE, error => error)
}

export const pageAction = {
  nextPage: {
    // 默认下一页为第二页
    request: createAction(NEXT_PAGE_LOAD.REQUEST),
    success: createAction(NEXT_PAGE_LOAD.SUCCESS),
    fail: createAction(NEXT_PAGE_LOAD.FAILURE)
  },
  prevPage: {
    request: createAction(PREV_PAGE_LOAD.REQUEST),
    success: createAction(PREV_PAGE_LOAD.SUCCESS),
    fail: createAction(PREV_PAGE_LOAD.FAILURE)
  }
}

export const loadMyFeed = (page = 1) => {
  return (dispatch, getState) => {
    dispatch(postsAction.request())
    const token = getState().getIn(['UserStore', 'token'])
    return fetchPosts(page, token).then(({response}) => {
      dispatch(postsAction.success(response))
    }).catch(e => {
      dispatch(postsAction.failure(e))
    })
  }
}

export const createPostAction = {
  request: createAction(POST_CREATE.REQUEST),
  success: createAction(POST_CREATE.SUCCESS, response => ({
    post: response.post
  })),
  failure: createAction(POST_CREATE.FAILURE, error => ({error}))
}

export const newPost = (data, done) => {
  return (dispatch, getState) => {
    const token = getState().getIn(['UserStore', 'token'])
    dispatch(createPostAction.request())
    return createPost(data, token).then(({response}) => {
      dispatch(createPostAction.success(response))
      typeof done === 'function' && done()
    }).catch(e => {
      dispatch(createPostAction.failure(e))
      typeof done === 'function' && done(e)
    })
  }
}
