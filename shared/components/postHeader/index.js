import moment from 'moment'
import React, {Component, PropTypes as Types} from 'react'
import Icon from 'react-fa'
import Dropdown from 'components/dropdown'
import { Link } from 'react-router'
import SvgMorph from 'components/svgMorph'
import MdExpandMore from 'react-icons/lib/md/expand-more'
import MdExpandLess from 'react-icons/lib/md/expand-less'
import styles from './index.scss'

class PostHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ctrl: false
    }
  }
  render () {
    const postAction = (
      <ul className={styles.menu}>
        <li>
          <a href=''><Icon name='share-alt' />分享</a>
        </li>
        <li>
          <a href=''><Icon name='exclamation-triangle' />举报</a>
        </li>
      </ul>
    )
    const { post } = this.props
    return (
      <div className={styles.postHeader}>
        {this.props.showCtrl ? (
          <div className={styles.postCtrl}>
            <Dropdown trigger={(
              <SvgMorph>
                {this.state.ctrl ? <MdExpandLess key='MdExpandLess'/> : <MdExpandMore key='MdExpandMore'/>}
              </SvgMorph>
            )} onShow={() => this.setState({ctrl: true})} onHide={() => this.setState({ctrl: false})}>
              {postAction}
            </Dropdown>
          </div>
        ) : null}
        <ul className={styles.postDetaiils}>
          <li>
            <Link to={`/profile/${post.author._id}`} >
              <img className={styles.postAuthorPhoto} src={post.author.avatarUrl} alt='' />
            </Link>
          </li>
          <li>
            <Link to={'/profile/' + post.author._id} className={styles.uname}>{post.author.nickname}</Link>
          </li>
          <li>
            <span className={styles.time}>{moment(post.create_time).fromNow()}</span>
          </li>
          <li>
            <span className={styles.in}>in <Link to='/tags/xx'>Nodejs</Link></span>
          </li>
        </ul>
      </div>
    )
  }
}
PostHeader.propTypes = {
  post: Types.object.isRequired,
  showCtrl: Types.bool
}
PostHeader.defaultProps = {
  showCtrl: true
}

export default PostHeader
