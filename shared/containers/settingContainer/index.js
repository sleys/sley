import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import styles from './index.scss'

class settingContainer extends Component {
  render () {
    const user = this.props.user
    return (
      <div className='content-s'>
        <Helmet title={`${user.nickname} Setting`} />
        <div className={styles.content}>
          <div className={styles.profileCard}>
            <div className={styles.bdCard}>
              <div>
                <img src={user.avatarUrl} alt={user.avatarUrl} className={styles.headImg}/>
              </div>
              <div className={styles.nickname}>
                {user.nickname}
              </div>
            </div>
            <div className={styles.userInfo}>
              <ul className='innerList'>
                <li>
                  Following {user.following.length}
                </li>
                <li>
                  Followers {user.followers.length}
                </li>
              </ul>
              <div>
                <label htmlFor=''>email</label>
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

settingContainer.propTypes = {
  user: Types.object.isRequired
}

const select = state => {
  return {
    user: state.getIn(['UserStore', 'user']).toJS()
  }
}

export default connect(select)(settingContainer)
