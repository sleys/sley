import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file'
import MdHome from 'react-icons/lib/md/home'
import MdExpandMore from 'react-icons/lib/md/expand-more'
import MdClose from 'react-icons/lib/md/close'
import { Link } from 'react-router'
import Textarea from 'react-textarea-autosize'
import cls from 'classnames'
import {
  VelocityTransitionGroup
} from 'velocity-react'
import Dropdown from 'components/dropdown'
import TagsInput from 'react-tagsinput'
import {
  newPost
} from 'redux/actions/posts'
import styles from './index.scss'

class WriteContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      tags: [],
      createIng: false,
      old: false,
      saveing: false
    }
    this.interval = null
    this.createNewPost = this.createNewPost.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onContentChange = this.onContentChange.bind(this)
    this.onTagChange = this.onTagChange.bind(this)
  }
  componentWillUnmount () {
    clearInterval(this.interval)
  }
  onTagChange (tag) {
    this.setState({
      tags: tag
    })
  }
  createNewPost () {
    this.setState({
      createIng: true
    })
    const post = {
      title: _.trim(this.state.title),
      content: _.trim(this.state.content),
      tags: this.state.tags
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
        title: d
      })
    } else {
      this.setState({
        title: value
      })
    }
  }
  onContentChange (e) {
    const maxLen = 20000 // 20000字数限制
    const value = e.target.value
    if (value.length > maxLen) {
      const d = value.slice(0, maxLen)
      this.setState({
        content: d
      })
    } else {
      this.setState({
        content: value
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
    const enterAnimation = {
      animation: 'transition.slideLeftIn',
      delay: 150,
      stagger: 150,
      duration: 400,
      style: {
        display: 'none'
      }
    }
    const leaveAnimation = {
      animation: 'transition.slideRightOut',
      stagger: 150,
      duration: 400
    }
    return (
      <div>
        <Helmet title='Write'/>
        <div className={styles.wirteButton}>
          <div className='row' style={{margin: '0 auto'}}>
            <Link to='/' className={styles.ctrl}>
              <MdHome />
            </Link>
            <a className={styles.ctrl}>
              <MdInsertDriveFile />{' '}
              <span className={styles.words}>
                {this.state.content && this.state.content.length}
              </span>
            </a>
            <a className={styles.ctrl}>
              {this.state.saveing ? '保存ing' : null}
              {this.state.old ? '继续上次未完成的内容' : null}
              {this.state.createIng ? '创建中' : ''}
            </a>
            <Dropdown className='u-pull-right' trigger={<span className={'primary ' + styles.ctrl} >发布 <MdExpandMore /></span>}>
              <div className={styles.a}>
                <p className={styles.publishText}>
                  准备发布？
                </p>
                <div className={styles.tags}>
                  添加标签（最多五个）标识你的文章，让更多人看到：
                  <div className={styles.tagInputBox}>
                    <TagsInput value={this.state.tags}
                               onChange={this.onTagChange}
                               onlyUnique
                               maxTags={5}
                               renderTag={(props) => {
                                 let {tag, key, onRemove, ...other} = props
                                 return (
                                   <span key={key} {...other}>
                                     {tag}
                                     {'  '}
                                     <MdClose onClick={(e) => {
                                       e.stopPropagation()
                                       onRemove(key)
                                     }} />
                                   </span>
                                 )
                               }}
                               renderInput={(props) => {
                                 let {onChange, value, ...other} = props
                                 return (
                                   <input type='text'
                                          onChange={onChange}
                                          value={value}
                                          autoFocus
                                          disabled={this.state.tags.length === 5}
                                          placeholder='Add a tag...' {...other} />
                                 )
                               }}
                               renderLayout={(tagComponents, inputComponent) => {
                                 return (
                                    <div>
                                      <div className={styles.renderTags}>
                                        <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation}>
                                          {tagComponents}
                                        </VelocityTransitionGroup>
                                      </div>
                                      {inputComponent}
                                    </div>
                                  )
                               }}
                    />
                  </div>
                </div>
                <div>
                  <button className='radius'>
                    存为草稿
                  </button>
                  <button className='radius u-pull-right primary' onClick={this.createNewPost} disabled={this.createIng}>
                    发布
                  </button>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
        <div className={'container ' + writeContainer}>
          { /* <div className={styles.authorInfo}>
            <img className={styles.authorImg} src={this.props.user.avatarUrl} />
            <span>{this.props.user.nickname}</span>
          </div> */}
          <div className={styles.titleWrap}>
            <Textarea className={titleClass}
                      placeholder='Title'
                      useCacheForDOMMeasurements
                      style={{maxHeight: 260}}
                      value={this.state.title}
                      onChange={this.onTitleChange}/>
          </div>
          <div>
            <Textarea className={contentClass}
                      useCacheForDOMMeasurements
                      placeholder='Say you want to say'
                      value={this.state.content}
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
