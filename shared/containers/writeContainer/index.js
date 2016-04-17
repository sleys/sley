import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Icon from 'react-fa'
import { Link } from 'react-router'
import Textarea from 'react-textarea-autosize'
import cls from 'classnames'
import {
  newPost
} from 'redux/actions/posts'
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
      old: false,
      saveing: false
    }
    this.interval = null
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
    const post = {
      ...this.state.write,
      title: _.trim(this.state.write.title),
      content: _.trim(this.state.write.content)
    }
    this.props.newPost(post, (e) => {
      if (!e) {
        localStorage.removeItem('post_save')
        this.setState({
          createIng: false
        })
      }
    })
  }
  onTitleChange (e) {
    const maxLen = 150
    const value = e.target.value
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
    const maxLen = 20000 // 20000字数限制
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
  render () {
    const titleClass = cls({
      'auto-size': true,
      [styles.textareaTitle]: true
    })
    const contentClass = cls({
      'auto-size': true,
      [styles.textareaContent]: true
    })
    const writeContainer = cls({
      [styles.writeContainer]: true
    })
    const wb = cls({
      [styles.wirteButton]: true
    })
    return (
      <div>
        <Helmet title='Write'/>
        <div className={wb}>
          <div className='column'>
            <Link to='/' className={styles.ctrl}>
              Home
            </Link>
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
          <div className={styles.titleWrap}>
            <Textarea className={titleClass}
                      placeholder='Title'
                      useCacheForDOMMeasurements
                      style={{maxHeight: 260}}
                      value={this.state.write.title}
                      onChange={this.onTitleChange}/>
          </div>
          <div>
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
  newPost: Types.func.isRequired
}

const select = state => {
  return {
    user: state.getIn(['UserStore', 'user']).toJS()
  }
}
const mapDispatchToState = {
  newPost
}
export default connect(select, mapDispatchToState)(WriteContainer)
