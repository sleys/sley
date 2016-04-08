import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import Icon from 'react-fa'
import { bindActionCreators } from 'redux'
import Textarea from 'react-textarea-autosize'
import { connect } from 'react-redux'
import cls from 'classnames'
import {
  newComment
} from 'redux/actions/postDetail'
import {
  showLoginModal
} from 'redux/actions/global'
import styles from './index.scss'

class WriteCommnet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: '',
      loading: false,
      done: false,
      reply_id: this.props.reply && this.props.reply._id
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit (e) {
    if (!this.props.isLogind) {
      alert('dd')
      return
    }
    this.setState({
      loading: true
    })
    let comment = {
      post_id: this.props.post._id,
      content: this.state.comment,
      reply: {
        reply_type: 'post',
        reply_id: this.props.post._id
      }
    }
    // if (this.props.reply && this.props.reply.author && this.props.reply.author._id) {
    //   comment.reply.reply_type = 'user'
    //   comment.reply.reply_id = this.props.reply._id
    // }
    this.props.newComment(comment, e => {
      this.setState({
        done: true,
        loading: false,
      })
      setTimeout(() => {
        this.setState({
          done: false,
          comment: ''
        })
      }, 2000)
    })
  }
  renderSubmitStatus () {
    if (this.state.loading) return 'loading ...'
    if (!this.state.loading && this.state.done) {
      return <Icon name='check' className='animated infinite tada'/>
    }
    return '评论'
  }
  render () {
    const subStyle = cls({
      'animated fadeIn button-primary': true,
      [styles.submit]: true,
      [styles.success]: this.state.done
    })
    return (
      <div className={styles.writeContainer}>
        <p className={styles.text}>
          发表你的评论
          <span className={styles.commentNum + ' u-pull-right'}>
            <Icon name='comment-o' />
          </span>
        </p>
        <div>
          <Textarea className={'auto-size ' + styles.commentTextarea}
                    placeholder={this.props.isLogind ? (this.state.done ? '' : 'Hello world') : '请先登录'}
                    useCacheForDOMMeasurements
                    value={this.state.comment}
                    onClick={() => !this.props.isLogind && this.props.showLoginModal()}
                    disabled={this.state.done || !this.props.isLogind}
                    onChange={e => this.props.isLogind && this.setState({comment: e.target.value})}/>
        </div>
        <div className={styles.info}>
          Words <span className={styles.words}>{this.state.comment.length}</span>
        </div>
        {this.props.isLogind && this.state.comment.length > 0 && (
          <button className={subStyle}
                  onClick={this.onSubmit} disabled={this.state.loading}>
            {this.renderSubmitStatus()}
          </button>
        )}
      </div>
    )
  }
}

WriteCommnet.propTypes = {
  post: Types.object.isRequired,
  user: Types.object,
  isLogind: Types.bool.isRequired,
  newComment: Types.func.isRequired,
  showLoginModal: Types.func.isRequired
}

const select = state => {
  return {

  }
}

const mapDispatchToState = dispatch => {
  return {
    newComment: bindActionCreators(newComment, dispatch),
    showLoginModal: bindActionCreators(showLoginModal, dispatch)
  }
}

export default connect(select, mapDispatchToState)(WriteCommnet)
