import _ from 'lodash'
import React, {Component, PropTypes as Types} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-fa'
import cls from 'classnames'
import Modal from 'react-modal'
import {
  like,
  down,
  unLike,
  unDown,
  closeLike,
  closeDown
} from 'redux/actions/posts'
import {
  fetchComments
} from 'api'
import PostHeader from 'components/postHeader'
import CommentView from 'components/commentView'
import SvgMorph from 'components/svgMorph'
import MdClear from 'react-icons/lib/md/clear'
import MdMoreVert from 'react-icons/lib/md/more-vert'
import styles from './index.scss'

const customStyles = {
  overlay: {
    backgroundColor: '#FAFAFA'
  },
  content: {
    border: 'none',
    width: '600px',
    height: 'auto',
    left: '50%',
    marginLeft: '-300px',
    borderRadius: '2px',
    paddingTop: 0,
    backgroundColor: '#FAFAFA'
  }
}

class PostView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postCtrl: false,
      showComment: false,
      showCommentLoading: false,
      select: {},
      comments: [],
      closeHovering: false
    }
    this.showCommentModal = this.showCommentModal.bind(this)
    this.closeCommentModal = this.closeCommentModal.bind(this)
  }
  showCommentModal (post, e) {
    this.setState({
      showComment: true,
      select: post,
      showCommentLoading: true
    })
    fetchComments(post._id).then(({response}) => {
      this.setState({
        showComment: true,
        showCommentLoading: false,
        comments: response.comments
      })
    })
  }
  closeCommentModal () {
    this.setState({
      showComment: false,
      showCommentLoading: false
    })
  }
  onLike (post) {
    if (!this.props.isLogind) {
      alert('plase login')
      return
    }
    const user_id = this.props.user._id
    if (_.includes(post.downs, user_id)) {
      // 本地取消用戶的down
      this.props.dispatch(closeDown(post._id, user_id))
    }
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
      // 本地取消用戶的like
      this.props.dispatch(closeLike(post._id, user_id))
    }
    if (_.includes(post.downs, this.props.user._id)) {
      this.props.unDown(post._id)
    } else {
      this.props.down(post._id)
    }
  }
  renderComment () {
    if (this.state.showCommentLoading) {
      return 'loading'
    }
    return (
      <div>
        <div style={{textAlign: 'right', fontSize: '20px', padding: '0 0 10px 0'}}>
          <span onMouseEnter={() => this.setState({closeHovering: true})} onMouseLeave={() => this.setState({closeHovering: false})}>
            <SvgMorph onClick={() => {
              this.setState({closeHovering: false})
              this.closeCommentModal()
            }} >
              {this.state.closeHovering ? <MdClear key='MdClear'/> : <MdMoreVert key='MdMoreVert' />}
            </SvgMorph>
          </span>
        </div>
        <div className='markdown-body inner'>
          <blockquote>{this.state.select.title}</blockquote>
        </div>
        {this.state.comments.length === 0 ? (
          <div className={styles.noComment}>
            暂无评论
          </div>
        ) : (
          <div>
            <div className={styles.commentList}>
              評論: {this.state.comments.length}
            </div>
            {this.state.comments.map((k, i) => {
              return <CommentView comment={k}/>
            })}
          </div>
        )}
    </div>
    )
  }
  render () {
    const post = this.props.data
    // const component = getTypeComponent(type, post)
    const liked = _.includes(post.likes, this.props.user._id)
    const downd = _.includes(post.downs, this.props.user._id)
    const likeName = cls({
      'heart-o': !liked,
      'heart zoomIn': !!liked,
      [styles.red]: !!liked,
      'animated': true
    })
    const downName = cls({
      'thumbs-down': !downd,
      'thumbs-down zoomIn': !!downd,
      [styles.black]: !!downd,
      'animated': true
    })
    return (
      <div className={styles.postCard}>
        <PostHeader post={post}/>
        <div className={styles.postContent}>
          <h2>
            <Link to={`/post/${post._id}`} className={styles.contentTitle}>
              {post.title}
            </Link>
          </h2>
          <div>
            {_.trunc(post.content, {
              'length': 300,
              'separator': /,? +/
            })}
          </div>
        </div>
        <div className={'u-max-full-width ' + styles.footer}>
          <ul className={styles.postActions}>
            {post.tags.map((k, i) => {
              return <li key={i} className={styles.tag}>#{k}</li>
            })}
          </ul>
          <ul className={styles.postActions + ' ' + 'u-pull-right'}>
            {this.props.showLikeAndDown ? (
              <li>
                <a onClick={this.onLike.bind(this, post)}>
                  <Icon name={likeName} /> {post.like}
                </a>
              </li>
            ) : null}
            {this.props.showLikeAndDown ? (
              <li>
                <a onClick={this.onDown.bind(this, post)}>
                  <Icon name={downName} /> {post.down}
                </a>
              </li>
            ) : null}
            <li>
              <a className={styles.views}><Icon name='eye'/> {post.views || 1}</a>
            </li>
            <li>
              <a className={styles.comment} onClick={this.showCommentModal.bind(this, post)}><Icon name='comment-o' /> {post.comment}</a>
            </li>
          </ul>
          <ul className={'u-pull-right ' + styles.postActions}>
          </ul>
        </div>
        {this.state.showComment && (
          <Modal isOpen={this.state.showComment}
              onRequestClose={this.closeCommentModal}
              style={customStyles}>
            {this.renderComment()}
          </Modal>
        )}
      </div>
    )
  }
}

PostView.propTypes = {
  user: Types.object,
  showLikeAndDown: Types.bool,
  showCtrl: Types.bool,
  data: Types.object.isRequired,
  isLogind: Types.bool.isRequired,
  like: Types.func.isRequired,
  unLike: Types.func.isRequired,
  down: Types.func.isRequired,
  unDown: Types.func.isRequired,
  dispatch: Types.func.isRequired
}

PostView.defaultProps = {
  showLikeAndDown: true,
  showCtrl: true
}
const select = state => {
  return {
    user: state.getIn(['UserStore', 'user']).toJS(),
    isLogind: state.getIn(['UserStore', 'logind'])
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

export default connect(select, mapDispatchToProps)(PostView)
