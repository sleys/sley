import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import {
  loadHot
} from 'redux/actions/hot'
import PostView from 'components/postView'
import styles from './index.scss'

class WelcomeContainer extends Component {
  constructor (props) {
    super(props)
    this.started = this.started.bind(this)
  }
  componentDidMount () {
    if (!this.props.loaded) {
      return this.props.dispatch(loadHot())
    }
  }
  started () {
    if (this.props.isLogind) {
      this.props.dispatch(push('/feed'))
      return
    } else {
      this.props.dispatch(push('/login'))
    }
  }
  render () {
    return (
      <div>
        <Helmet title='Welcome' />
        <div className={styles.indexContainer}>
          <div className='container'>
            <div className='row'>
              <div className={styles.content}>
                <h1 className={styles.contenTitle}>Move thinking forward.</h1>
                <h2 className={styles.contenSubTitle}>
                  sley 是一个简单的，内容社区,
                  努力提供更好的，更舒适的使用体验
                </h2>
                <h3 className={styles.contenText}>Reading and Write.</h3>
                <div className={styles.btn}>
                  <button className='button-primary' onClick={this.started}>开始使用</button>
                  <Link to='/about' className='button'>更多</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.postsContent}>
            <div className='row'>
              <div className='seven columns'>
                <div className={styles.hotPosts}>
                  <p>Hot posts</p>
                  <hr/>
                </div>
                <div>
                  {this.props.hotPost.map((k, i) => {
                    return <PostView data={k.toJS()} key={i} showLikeAndDown={false} showCtrl={false} />
                  })}
                </div>
              </div>
              <div className='five columns'>
                <div className={styles.hotUsers}>
                  <p>Hot users</p>
                  <hr/>
                </div>
                <div>
                  {this.props.hotUser.map((k, i) => {
                    return <p>{k.nickname}</p>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

WelcomeContainer.propTypes = {
  hotPost: Types.array.isRequired,
  hotUser: Types.array.isRequired,
  dispatch: Types.func.isRequired,
  isLogind: Types.bool.isRequired,
  loaded: Types.bool
}

const select = state => {
  return {
    hotPost: state.getIn(['HotStore', 'hotPost']).toArray(),
    hotUser: state.getIn(['HotStore', 'hotUser']).toArray(),
    loaded: state.getIn(['HotStore', 'hotPost', 'loaded']),
    isLogind: state.getIn(['UserStore', 'logind'])
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}
export default connect(select, mapDispatchToProps)(WelcomeContainer)
