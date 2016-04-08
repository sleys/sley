import callFetch from './callFetch'

const getAuthHeader = token => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
}

export const fetchUser = login => {
  return callFetch(`/users/${login}`)
}

export const fetchProfile = token => {
  return callFetch(`/users/profile`, {
    headers: {
      ...getAuthHeader(token)
    }
  })
}

export const fetchPosts = (page, token) => {
  return callFetch(`/posts?page=${page}`, {
    headers: {
      ...getAuthHeader(token)
    }
  })
}

export const fetchLogin = data => {
  return callFetch(`/auth/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export const fetchHot = () => {
  return callFetch('/posts/hot')
}

export const fetchVoteLike = (post_id, op, token) => {
  return callFetch(`/posts/vote/${post_id}`, {
    headers: {
      ...getAuthHeader(token),
      'Content-Type': 'application/json'
    },
    method: op === 'inc' ? 'POST' : 'DELETE',
    body: JSON.stringify({
      type: 'like'
    })
  })
}

export const fetchVoteDown = (post_id, op, token) => {
  return callFetch(`/posts/vote/${post_id}`, {
    headers: {
      ...getAuthHeader(token),
      'Content-Type': 'application/json'
    },
    method: op === 'inc' ? 'POST' : 'DELETE',
    body: JSON.stringify({
      type: 'down'
    })
  })
}

export const fetchSimilarYou = token => {
  return callFetch(`/users/similar`, {
    headers: {
      ...getAuthHeader(token)
    }
  })
}

export const fetchRegister = data => {
  return callFetch('/users/register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export const activeUser = token => {
  return callFetch(`/users/active?token=${token}`)
}

export const followUser = (follow_id, token, unFollow) => {
  return callFetch(`/users/follow/${follow_id}`, {
    method: unFollow ? 'DELETE' : 'POST',
    headers: {
      ...getAuthHeader(token)
    }
  })
}

export const fetchNodes = offset => {
  return callFetch(`/nodes?offset=${offset}`)
}

export const fetchNode = node_id => {
  return callFetch(`/nodes/${node_id}`)
}

export const createPost = (data, token) => {
  return callFetch(`/posts`, {
    method: 'POST',
    headers: {
      ...getAuthHeader(token)
    },
    body: JSON.stringify(data)
  })
}

export const fetchComments = post_id => {
  return callFetch(`/comments/${post_id}`)
}

export const fetchPost = (post_id, token) => {
  return callFetch(`/posts/${post_id}`, {
    headers: {
      ...getAuthHeader(token)
    }
  })
}

export const createComment = (comment, token) => {
  return callFetch(`/comments`, {
    method: 'POST',
    headers: {
      ...getAuthHeader(token)
    },
    body: JSON.stringify(comment)
  })
}
