import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import {
	POSTS_LOAD,
  PREV_PAGE,
  PREV_PAGE_LOAD,
  NEXT_PAGE,
  NEXT_PAGE_LOAD,
  LIKE_POST,
  UNLIKE_POST,
  DOWN_POST,
  UNDOWN_POST
} from 'redux/constants/posts'

const notZero = (num) => {
  return num > 0 ? num : 1
}

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  loadingNext: false,
  msg: '',
  error: '',
  data: [],
  currentPage: 1,
  nextPage: 2,
  prevPage: 1,
  count: 0,
  postsCount: 0
})

export default handleActions({
  [POSTS_LOAD.REQUEST]: (state, { payload }) => {
    return state.set('loading', true)
  },
  [POSTS_LOAD.SUCCESS]: (state, { payload }) => {
    let { posts, postsCount, count } = payload
    const data = posts.map(post => Immutable.Map(post))
    return state.set('loading', false)
                .set('loaded', true)
                .set('data', state.get('data').merge(Immutable.List(data)))
                .set('postsCount', postsCount)
                .set('count', state.get('count') + count)
                .set('msg', '加载成功')
  },
  [POSTS_LOAD.FAILURE]: (state, { payload }) => {
    return state.set('loading', false)
                .set('error', payload.error)
  },
  // 下一页
  [NEXT_PAGE]: (state, { payload }) => {
    let nextPage = notZero(payload.nextPage || state.get('nextPage'))
    return state.set('nextPage', nextPage)
  },
  [NEXT_PAGE_LOAD.REQUEST]: (state, { payload }) => {
    return state.set('loadingNext', true)
  },
  [NEXT_PAGE_LOAD.SUCCESS]: (state, { payload }) => {
    let { posts, count } = payload
    return state.set('loadingNext', false)
                .set('currentPage', state.get('nextPage'))
                .set('nextPage', state.get('nextPage') + 1)
                .set('prevPage', notZero(state.get('nextPage') - 1))
                .set('data', state.get('data').concat(Immutable.List(posts)))
                .set('count', state.get('count') + count)
  },
  [NEXT_PAGE_LOAD.FAILURE]: (state, { payload }) => {
    return state.set('loadingNext', false)
                .set('nextPage', state.get('currentPage') + 1)
  },
  // 上一页
  [PREV_PAGE]: (state, { payload }) => {
    let prevPage = notZero(payload.prevPage || state.get('currentPage') - 1)
    return state.set('prevPage', prevPage)
  },
  [PREV_PAGE_LOAD.REQUEST]: (state, { payload }) => {
    return state.set('loadingNext', true)
  },
  [PREV_PAGE_LOAD.SUCCESS]: (state, { payload }) => {
    let { posts, count } = payload
    return state.set('loadingNext', false)
                .set('currentPage', state.get('prevPage'))
                .set('nextPage', state.get('prevPage') + 1)
                .set('prevPage', notZero(state.get('prevPage') - 1))
                .set('count', state.get('count') - count)
                .set('posts', state.get('posts').slice(0, state.get('posts').size - posts.length))
  },
  [PREV_PAGE_LOAD.FAILURE]: (state, { payload }) => {
    return state.set('loadingNext', false)
                .set('prevPage', state.get('currentPage') - 1)
  },
  // TODO toJS update Immutable.List
  [LIKE_POST.SUCCESS]: (state, { payload }) => {
    const { user_id, post_id, like } = payload
    const index = state.get('data').findIndex((post) => post.get('_id') === post_id)
    const p = state.get('data').update(index, post => {
      const _post = post.toJS()
      _post.likes.push(user_id)
      return post.set('likes', _post.likes)
                 .set('like', like)
    })
    return state.set('data', p)
  },
  [UNLIKE_POST.SUCCESS]: (state, { payload }) => {
    const { user_id, post_id } = payload
    const index = state.get('data').findIndex((post) => post.get('_id') === post_id)
    const p = state.get('data').update(index, post => {
      const userIndex = post.get('likes').findIndex(_id => _id === user_id)
      const _post = post.toJS()
      _post.likes.splice(userIndex, 1)
      return post.set('like', post.get('like') - 1)
                 .set('likes', _post.likes)
    })
    return state.set('data', p)
  },
  [DOWN_POST.SUCCESS]: (state, { payload }) => {
    const { user_id, post_id, down } = payload
    const index = state.get('data').findIndex((k) => k.get('_id') === post_id)
    const p = state.get('data').update(index, post => {
      let _post = post.toJS()
      _post.downs.push(user_id)
      return post.set('downs', _post.downs)
                 .set('down', down)
    })
    return state.set('data', p)
  },
  [UNDOWN_POST.SUCCESS]: (state, { payload }) => {
    const { user_id, post_id } = payload
    const index = state.get('data').findIndex((post) => post.get('_id') === post_id)
    const p = state.get('data').update(index, post => {
      const userIndex = post.get('downs').findIndex(_id => _id === user_id)
      let _post = post.toJS()
      _post.downs.splice(userIndex, 1)
      return post.set('downs', _post.downs)
                 .set('down', post.get('down') - 1)
    })
    return state.set('data', p)
  }
}, initialState)
