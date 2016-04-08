import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import CommentView from 'components/commentView'
import {
  VelocityTransitionGroup
} from 'velocity-react'
import styles from './index.scss'

const limit = 3

const enterAnimation = {
  animation: 'transition.slideDownIn',
  stagger: 100,
  duration: 400,
  display: 'block',
  style: {
    display: 'none'
  }
}

const leaveAnimation = {
  animation: 'transition.slideDownOut',
  stagger: 100,
  duration: 400
}

class CommentsListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      duration: 400
    }
  }
  render () {
    if (this.props.commentLoading) {
      return (
        <div>
          Loading comments ing
        </div>
      )
    }
    if (this.props.comments.length === 0) {
      return (
        <div>
          No Comments
        </div>
      )
    }
    this.maxPage = Math.floor(this.props.comments / limit)
    const comments = this.props.comments.map((comment, key) => {
      return <CommentView comment={comment} key={comment._id} onReplyComment={this.props.onReplyComment} />
    })
    return (
      <div className={styles.commentListView}>
        <VelocityTransitionGroup runOnMount component='div' enter={enterAnimation} leave={leaveAnimation}>
          {comments}
        </VelocityTransitionGroup>
        {this.props.comments.length > 5 && this.state.page < this.maxPage && (
          <div className={styles.commentInfo} onClick={() => this.setState({page: this.state.page + 1})}>
            加载更多评论
          </div>
        )}
        {this.state.page === this.maxPage && (
          <div className={styles.commentInfo}>
            没有更多评论
          </div>
        )}
      </div>
    )
  }
}

CommentsListView.propTypes = {
  post: Types.object,
  comments: Types.array,
  commentLoading: Types.bool.isRequired,
  user: Types.object.isRequired,
  isLogind: Types.bool.isRequired,
  onReplyComment: Types.func.isRequired
}

const select = state => {
  return {
    user: state.getIn(['UserStore', 'user']).toJS(),
    isLogind: state.getIn(['UserStore', 'logind']),
    commentLoading: state.getIn(['PostDetailStore', 'fetchCommnets']),
    comments: state.getIn(['PostDetailStore', 'comments']).toJS()
  }
}

export default connect(select)(CommentsListView)
