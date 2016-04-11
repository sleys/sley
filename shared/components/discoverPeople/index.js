import React, { Component, PropTypes as Types } from 'react'
import Icon from 'react-fa'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
  similarYou
} from 'redux/actions/user'
import FollowUser from 'components/followUser'
import styles from './index.scss'

class DiscoverPeople extends Component {
  render () {
    return (
      <div className={styles.sidebarWeiget}>
        <p>
          Maybe your like
          <a className='u-pull-right' onClick={() => this.props.dispatch(similarYou())}>
            <Icon name='refresh'/>
          </a>
        </p>
        {this.props.users.map((k, i) => {
          return (
            <div className={styles.peopleCard} key={i}>
              <a href='#' className={styles.peoplePhoto}>
                <img src={k.avatarUrl} alt='' />
              </a>
              <div className={styles.peopleInfo}>
                <Link to={`/u/${k._id}`}>{k.nickname}</Link>
                <FollowUser className='radius' userInfo={k} key={i} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

DiscoverPeople.propTypes = {
  users: Types.array,
  dispatch: Types.func.isRequired
}

const select = (state) => {
  return {}
}

export default connect(select)(DiscoverPeople)
