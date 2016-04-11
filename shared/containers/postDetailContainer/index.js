import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import moment from 'moment'
import Icon from 'react-fa'
import cls from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import {
  loadPost,
  loadComments
} from 'redux/actions/postDetail'
import FollowUser from 'components/followUser'
import MarkdownView from 'components/markdownView'
import CommentsListView from 'components/commentsListView'
import WriteComment from 'components/writeComment'
import {
  like,
  unLike,
  down,
  unDown,
  closeLike,
  closeDown
} from 'redux/actions/postDetail'
import styles from './index.scss'

@provideHooks({
  fetch: ({ dispatch, params, getState }) => {
    const { post_id } = params
    if (getState().getIn(['PostDetailStore', 'post', '_id']) !== post_id) {
      return dispatch(loadPost(post_id))
    }
  },
  defer: ({ dispatch, params, getState }) => {
    const { post_id } = params
    return dispatch(loadComments(post_id))
  }
})
class PostContainer extends Component {
  constructor (props) {
    super(props)
  }
  onLike (post) {
    if (!this.props.isLogind) {
      alert('plase login')
      return
    }
    const user_id = this.props.user._id
    if (_.includes(post.downs, user_id)) {
      // close user downs
      this.props.dispatch(closeDown(post._id, user_id))
    }
    // find user_id in post.likes
    if (_.includes(post.likes, this.props.user._id)) {
      // close like
      this.props.unLike(post._id)
    } else {
      this.props.like(post._id)
    }
  }
  onDown (post) {
    if (!this.props.isLogind) {
      alert('plase login')
      return
    }
    const user_id = this.props.user._id
    if (_.includes(post.likes, this.props.user._id)) {
      // close user likes
      this.props.dispatch(closeLike(post._id, user_id))
    }
    // find user_id in post.likes
    if (_.includes(post.downs, this.props.user._id)) {
      // close down
      this.props.unDown(post._id)
    } else {
      this.props.down(post._id)
    }
  }
  renderHeader () {
    if (this.props.loading) {
      return (
        <div>
          loading
        </div>
      )
    }
    const post = this.props.post
    const liked = _.includes(post.likes, this.props.user._id)
    const downd = _.includes(post.downs, this.props.user._id)
    const likeName = cls({
      'heart-o': !liked,
      'heart zoomIn': !!liked,
      [styles.liked]: !!liked,
      'animated': true
    })
    const downName = cls({
      'thumbs-down': !downd,
      'thumbs-down zoomIn': !!downd,
      [styles.downd]: !!downd,
      'animated': true
    })
    return (
      <div className={'content-s container ' + styles.container}>
        <div className='eight columns'>
          <div className={styles.titleContent}>
            <Link to={`/post/${post._id}`}>
              <h1 className={styles.title}>{post.title}</h1>
            </Link>
          </div>
          <ul className={'innerList ' + styles.postDetailInfo}>
            <li className={styles.fromNow}>
              <Icon name='pencil' />{' '}
              {moment(post.create_time).fromNow()} in <a>javscript</a>
            </li>
            <li>
              <a className={styles.vote} onClick={this.onLike.bind(this, post)}>
                <Icon name={likeName} /> {post.like}
              </a>
            </li>
            <li>
              <a className={styles.vote} onClick={this.onDown.bind(this, post)}>
                <Icon name={downName} /> {post.down}
              </a>
            </li>
          </ul>
        </div>
        <div className='four columns'>
          <ul className='innerList'>
            <li>
              <img src={post.author.avatarUrl} alt='' className={styles.authorHead} />
              <p className={styles.authorName}>{post.author.nickname}</p>
              {this.props.user._id !== post.author._id && <FollowUser className={'radius ' + styles.markPost} userInfo={post.author} />}
            </li>
            <li className={styles.postInfo}>
              <span className={styles.postInfoNum}>
                <span className={styles.postMarkNum}>0</span>收藏,
                <span className={styles.viewNum}> {post.views}</span>浏览
              </span>
              <button className={'radius ' + styles.markPost}>收藏</button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  renderPost () {
    const post = this.props.post
    if (this.props.loading) {
      return (
        <div>
          loading
        </div>
      )
    }
    return (
      <div className={'row ' + styles.detailView}>
        <MarkdownView content={post.content} style={{paddingTop: '0'}} />
      </div>
    )
  }
  render () {
    return (
      <div>
        <Helmet title={this.props.post.title}/>
        <div style={{background: '#fff'}}>
          {this.renderHeader()}
          {this.renderPost()}
        </div>
        <div>
          <div className={'row ' + styles.commentView}>
            <WriteComment user={this.props.user} post={this.props.post} isLogind={this.props.isLogind} />
            <CommentsListView />
          </div>
        </div>
      </div>
    )
  }
}

PostContainer.propTypes = {
  user: Types.object,
  isLogind: Types.bool.isRequired,
  post: Types.object.isRequired,
  like: Types.func.isRequired,
  unLike: Types.func.isRequired,
  down: Types.func.isRequired,
  unDown: Types.func.isRequired,
  dispatch: Types.func.isRequired,
  loading: Types.bool
}

const select = state => {
  return {
    user: state.getIn(['UserStore', 'user']).toJS(),
    isLogind: state.getIn(['UserStore', 'logind']),
    post: state.getIn(['PostDetailStore', 'post']).toJS(),
    loading: state.getIn(['PostDetailStore', 'loading'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    like: bindActionCreators(like, dispatch),
    unLike: bindActionCreators(unLike, dispatch),
    down: bindActionCreators(down, dispatch),
    unDown: bindActionCreators(unDown, dispatch),
    dispatch
  }
}

export default connect(select, mapDispatchToProps)(PostContainer)
