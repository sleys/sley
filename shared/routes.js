import React from 'react'
import { match, Route, IndexRoute } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { push } from 'react-router-redux'
// wrapper
import rootContainer from 'containers/rootContainer'
import appContainer from 'containers/appContainer'
// login and register
import loginContainer from 'containers/loginContainer'
import forgotPassContainer from 'containers/forgotPassContainer'
import registerContainer from 'containers/registerContainer'
import registerActiveContainer from 'containers/registerActiveContainer'
import feedContainer from 'containers/feedContainer'

// required auth
import settingContainer from 'containers/settingContainer'
import writeContainer from 'containers/writeContainer'
import notificationContainer from 'containers/notificationContainer'

import aboutContainer from 'containers/aboutContainer'
import searchContainer from 'containers/searchContainer'
import postDetailContainer from 'containers/postDetailContainer'
import profileContainer from 'containers/profileContainer'
import hotsContainer from 'containers/hotsContainer'
import tagsContainer from 'containers/feedContainer'
import collectionsContainer from 'containers/feedContainer'
import nodesContainer from 'containers/nodesContainer'
import nodePostsContainer from 'containers/nodePostsContainer'
import exploreContainer from 'containers/feedContainer'
// not found
import notFoundConainer from 'containers/notFoundConainer'

const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.get('UserStore'),
  predicate: auth => auth.get('logind'),
  failureRedirectPath: '/login',
  redirectAction: push,
  wrapperDisplayName: 'UserIsJWTAuthenticated'
})

// admin
// import adminContainer from 'containers/admin/adminContainer'

export function matchLocation (routes, location) {
  return new Promise((resolve, reject) => {
    match({routes, location}, (err, redirect, renderProps) => {
      if (err) reject(err)
      resolve({redirect, renderProps})
    })
  })
}

export default (store) => {
  const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState)
  const routes = (
    <Route path='/' component={rootContainer}>
      <IndexRoute component={feedContainer} />

      <Route component={requireAuthentication(appContainer)}
             onEnter={connect(requireAuthentication.onEnter)}>
        <Route path='write' component={writeContainer} />
        <Route path='notifications' component={notificationContainer} />
        <Route path='setting' component={settingContainer} />
        <Route path='tags' component={tagsContainer} />
        <Route path='collections' component={collectionsContainer} />
        <Route path='explore' component={exploreContainer} />
      </Route>

      <Route path='search' component={searchContainer} />

      <Route path='hots' component={hotsContainer} />

      <Route path='profile/:_id' component={profileContainer} />

      <Route path='nodes' component={nodesContainer} />
      <Route path='nodes/:node_id' component={nodePostsContainer} />

      <Route path='post/:post_id' component={postDetailContainer} />

      <Route path='about' component={aboutContainer} />

      <Route path='login' component={loginContainer} />

      <Route path='forgot' component={forgotPassContainer} />

      <Route path='register' component={registerContainer} />
      <Route path='register/active' component={registerActiveContainer} />

      <Route path='*' component={notFoundConainer} />
    </Route>
  )

  return routes
}
