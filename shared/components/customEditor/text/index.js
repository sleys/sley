/**
 * Created by kee on 15/9/28.
 */
import React, { Component, PropTypes as Types } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Defaults from '../base'
import TextArea from '../../textArea'
import Markdown from '../../markdownView'
import * as postsActions from '../../../actions/posts'
import * as authActions from '../../../actions/auth'
import styles from './styles/index.styl'

class TextEditor extends Component {
  state = {
    isPreview: false,
    content: ''
  };
  onCloseEditor (e) {
    // TODO https://github.com/rackt/react-modal/pull/91
    if (this.state.content.trim().length > 0) {
      if (window.confirm('您有正在编辑的内容确定要关闭吗？')) {
        this.props.onClose()
        return true
      }
      // e.preventDefault()
      return false
    }
    this.props.onClose()
  }
  _preview () {
    this.setState({
      isPreview: !this.state.isPreview
    })
  }
  _post () {
    if (!this.props.authActions.isLogin()) {
      return alert('请先登录')
    }
    const newPost = {
      content: this.state.content,
      type: 'text',
      author: {
        name: this.props.user.name,
        email: this.props.user.email
      },
      create_time: Date.now()
    }
    this.props.postsActions.createPost(newPost, (post) => {
      socket.emit('create:post', post)
      alert('创建成功')
    })
  }
  update (e) {
    this.setState({
      content: e.getValue()
    })
  }
  renderHeader () {
    return (
      <span>
        创建你的新文章
      </span>
    )
  }
  render () {
    return (
      <Defaults onClose={this.onCloseEditor.bind(this)} header={this.renderHeader()}>
        <div style={{minHeight: '400px', borderBottom: '1px solid #ccc'}}>
          {this.state.isPreview ? (
            <div style={{padding: '0 0 0 10px'}}>
              <Markdown content={this.state.content} />
            </div>
          ) : (
            <TextArea id='editor' content={this.state.content}
                      onChange={this.update.bind(this)} />
          )}
        </div>
        <div className={'ctrl ' + styles.newPost }>
          <button className='btn btn-success'
                  onClick={this._preview.bind(this)}>{this.state.isPreview ? '取消预览' : '预览'}</button>
          <button type='submit'
                  className='btn btn-done'
                  onClick={this._post.bind(this)} >发布</button>
        </div>
      </Defaults>
		)
  }
}

TextEditor.propTypes = {
  posts: Types.object.isRequired,
  auth: Types.object.isRequired,
  user: Types.object,
  onClose: Types.func.isRequired,
  authActions: Types.object.isRequired,
  postsActions: Types.object.isRequired,
  config: Types.object.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postsActions: bindActionCreators(postsActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor)
