import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Icon from 'react-fa'
import { bindActionCreators } from 'redux'
import Textarea from 'react-textarea-autosize'
import cls from 'classnames'
import {
  newPost
} from 'redux/actions/posts'
import {
  showHeader,
  hideHeader
} from 'redux/actions/global'
import styles from './index.scss'

class WriteContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      write: {
        title: '',
        content: ''
      },
      createIng: false,
      full: false,
      old: false,
      saveing: false
    }
    this.interval = null
    this.full = this.full.bind(this)
    this.addTag = this.addTag.bind(this)
    this.createNewPost = this.createNewPost.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onContentChange = this.onContentChange.bind(this)
  }
  componentDidMount () {
    // setTimeout(() => {
    //   const write = JSON.parse(localStorage.getItem('post_save'))
    //   if (!write) return
    //   this.setState({
    //     write: write,
    //     old: true
    //   }, () => {
    //     setTimeout(() => {
    //       this.setState({
    //         old: false
    //       })
    //     }, 2000)
    //   })
    // }, 500)
    // const saveing = (write) => {
    //   console.log('save ing')
    //   this.setState({
    //     saveing: true
    //   })
    //   localStorage.setItem('post_save', JSON.stringify(write))
    //   setTimeout(() => {
    //     this.setState({
    //       saveing: false
    //     })
    //   }, 500)
    // }
    // this.interval = setInterval(() => {
    //   const { content, title } = this.state.write
    //   if (!content || !title) return
    //   const write = JSON.parse(localStorage.getItem('post_save'))
    //   if (write) {
    //     if (title !== write.title || content !== write.content) {
    //       saveing({
    //         content,
    //         title
    //       })
    //     }
    //   } else {
    //     saveing({
    //       content,
    //       title
    //     })
    //   }
    // }, 5000)
  }
  componentWillUnmount () {
    clearInterval(this.interval)
  }
  addTag () {

  }
  createNewPost () {
    this.setState({
      createIng: true
    })
    this.props.newPost(this.state.write, (e) => {
      if (!e) {
        localStorage.removeItem('post_save')
        this.setState({
          createIng: false
        })
      }
    })
  }
  onTitleChange (e) {
    const maxLen = 300
    const value = _.trimRight(e.target.value)
    if (value.length > maxLen) {
      const d = value.slice(0, maxLen)
      this.setState({
        write: {
          ...this.state.write,
          title: d
        }
      })
    } else {
      this.setState({
        write: {
          ...this.state.write,
          title: value
        }
      })
    }
  }
  onContentChange (e) {
    const maxLen = 20000 // 5000字数限制
    const value = e.target.value
    if (value.length > maxLen) {
      const d = value.slice(0, maxLen)
      this.setState({
        write: {
          ...this.state.write,
          content: d
        }
      })
    } else {
      this.setState({
        write: {
          ...this.state.write,
          content: value
        }
      })
    }
  }
  full () {
    const isFull = this.state.full
    if (isFull) {
      this.props.hideHeader()
      this.setState({
        full: false
      })
    } else {
      this.props.showHeader()
      this.setState({
        full: true
      })
    }
  }
  render () {
    const content = cls({
      [styles.content]: true
    })
    const titleClass = cls({
      'auto-size': true,
      [styles.textareaTitle]: true,
      [styles.textareaTitleFull]: this.state.full
    })
    const contentClass = cls({
      'auto-size': true,
      [styles.textareaContent]: true,
      [styles.textareaContentFull]: this.state.full
    })
    const writeContainer = cls({
      [styles.writeContainer]: true,
      [styles.writeContainerFull]: this.state.full
    })
    const wb = cls({
      [styles.wirteButton]: true,
      [styles.writeButtonFull]: this.state.full
    })
    return (
      <div>
        <Helmet title='Write'/>
        <div className={wb}>
          <div className='column'>
            <a className={styles.ctrl} onClick={this.full}>
              <Icon name={this.state.full ? 'compress' : 'expand'}/>
            </a>
            <a className={styles.ctrl}>
              <Icon name='file-o' />{' '}
              <span className={styles.words}>
                {this.state.write.content && this.state.write.content.length}
              </span>
            </a>
            <a className={styles.ctrl}>
              {this.state.saveing ? '保存ing' : null}
              {this.state.old ? '继续上次未完成的内容' : null}
              {this.state.createIng ? '创建中' : ''}
            </a>
            <a className={'button button-primary ' + styles.ctrlBtn} style={{marginRight: '30px'}}>存为草稿</a>
            <a className={'button button-primary ' + styles.ctrlBtn} onClick={this.createNewPost}>发布</a>
          </div>
        </div>
        <div className={'container ' + writeContainer}>
          <div className={styles.authorInfo}>
            <img className={styles.authorImg} src={this.props.user.avatarUrl} />
            <span>{this.props.user.nickname}</span>
          </div>
          <div>
            <Textarea className={titleClass}
                      placeholder='Title'
                      useCacheForDOMMeasurements
                      style={{maxHeight: 260}}
                      value={this.state.write.title}
                      onChange={this.onTitleChange}/>
          </div>
          <div style={{marginTop: '25px'}}>
            <Textarea className={contentClass}
                      useCacheForDOMMeasurements
                      placeholder='Say you want to say'
                      value={this.state.write.content}
                      onChange={this.onContentChange}/>
          </div>
        </div>
      </div>
    )
  }
}

WriteContainer.propTypes = {
  user: Types.object.isRequired,
  dispatch: Types.func.isRequired,
  showHeader: Types.func.isRequired,
  hideHeader: Types.func.isRequired,
  newPost: Types.func.isRequired
}

const select = state => {
  return {
    user: state.getIn(['UserStore', 'user']).toJS()
  }
}
const mapDispatchToState = dispatch => {
  return {
    dispatch,
    showHeader: bindActionCreators(showHeader, dispatch),
    hideHeader: bindActionCreators(hideHeader, dispatch),
    newPost: bindActionCreators(newPost, dispatch)
  }
}
export default connect(select, mapDispatchToState)(WriteContainer)
