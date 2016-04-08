import React, { Component, PropTypes as Types } from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import MdReply from 'react-icons/lib/md/reply'
import MdBookmark from 'react-icons/lib/md/bookmark'
import MdEdit from 'react-icons/lib/md/edit'
import ReplyComment from 'components/replyComment'
import SvgMorph from 'components/svgMorph'
import MarkdownView from 'components/markdownView'
import cls from 'classnames'
import styles from './index.scss'

class CommentsView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showReply: false
    }
  }
  render () {
    const comment = this.props.comment
    const icon = this.state.showReply ? <MdReply key='reply' /> : <MdEdit key='write' />
    const c = cls({
      [styles.commentView]: true,
      [styles.replyIng]: this.state.showReply
    })
    return (
      <div>
        <div className={c}>
          <div className={styles.header}>
            <div className={styles.commentHead}>
              <Link to={`/u/${comment.author._id}`}>
                <img src={comment.author.avatarUrl} alt='' width='45'/>
              </Link>
            </div>
            <div className={styles.commentUserInfo}>
              <Link to={`/u/${comment.author._id}`}>{comment.author.nickname}</Link>
              <p className={styles.createTime}>{moment(comment.create_time).fromNow()}</p>
            </div>
          </div>
          <MarkdownView content={comment.content} inner/>
          <div className={styles.footer}>
            <ul className={'innerList ' + styles.footerList }>

            </ul>
            <ul className={'innerList ' + styles.footerListR }>
              <li>
                <a className={styles.reply} href='javascript:void(0)'>
                  <MdBookmark />
                </a>
              </li>
              <li>
                <a className={styles.reply} href='javascript:void(0)' onClick={() => this.setState({showReply: !this.state.showReply}) && this.forceUpdate()}>
                  <SvgMorph>
                    {icon}
                  </SvgMorph>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ReplyComment comment={comment} reply={comment.author.nickname} show={this.state.showReply} />
      </div>
    )
  }
}
CommentsView.propTypes = {
  comment: Types.object.isRequired,
  onSelectComment: Types.func
}
export default CommentsView
