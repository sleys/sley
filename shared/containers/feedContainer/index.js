import React, { PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import PureComponent from 'react-pure-render/component'
import { provideHooks } from 'redial'
import {
  VelocityTransitionGroup
} from 'velocity-react'
import {
  loadMyFeed
} from 'redux/actions/posts'
import LifeSidebar from 'components/leftSidebar'
import DiscoverPeople from 'components/discoverPeople'
import WritePost from 'components/writePost'
import PostView from 'components/postView'
import Loading from 'components/loading'
import styles from './index.scss'

import WelcomeContainer from 'containers/welcomeContainer'

@provideHooks({
  fetch: ({ dispatch, getState }) => {
    if (getState().getIn(['UserStore', 'logind'])) {
      const { page } = getState().get('routing').locationBeforeTransitions.query
      return dispatch(loadMyFeed(page))
    }
  }
})
class FeedContainer extends PureComponent {
  renderPosts () {
    if (this.props.posts.get('error')) {
      return this.props.posts.get('error')
    }
    if (this.props.data.length > 0) {
      var enterAnimation = {
        animation: 'transition.slideLeftIn',
        delay: 150,
        stagger: 150,
        duration: 400,
        display: 'block',
        style: {
          display: 'none'
        }
      }
      var leaveAnimation = {
        animation: 'transition.slideRightOut',
        stagger: 150,
        duration: 400
      }
      const posts = this.props.data.map((k, i) => <div key={i} ><PostView data={k.toJS()} /></div>)
      return (
        <VelocityTransitionGroup runOnMount component='div' enter={enterAnimation} leave={leaveAnimation}>
          {posts}
        </VelocityTransitionGroup>
      )
    } else {
      return '没有post'
    }
  }
  render () {
    if (!this.props.logind) {
      return <WelcomeContainer />
    }
    return (
      <div>
        <Helmet title='Home'/>
        <div className='row content'>
          <LifeSidebar />
          <div className='seven columns'>
            <WritePost />
            <div className={styles.posts}>
              <div style={{textAlign: 'center'}}>
                <Loading loading={this.props.loading} width={30} height={30}/>
              </div>
              {this.renderPosts()}
            </div>
          </div>
          <div className='three columns animated fadeIn'>
            <DiscoverPeople />
          </div>
        </div>
      </div>
    )
  }
}

FeedContainer.propTypes = {
  posts: Types.object.isRequired,
  loading: Types.bool,
  loadingNext: Types.bool.isRequired,
  data: Types.array.isRequired,
  logind: Types.bool.isRequired
}

const select = (state) => {
  const posts = state.get('PostStore')
  return {
    posts: posts,
    config: state.get('config'),
    loading: posts.get('loading'),
    loadingNext: posts.get('loadingNext'),
    data: posts.get('data').toArray(),
    logind: state.getIn(['UserStore', 'logind'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(select, mapDispatchToProps)(FeedContainer)
