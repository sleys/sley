import React, { Component, PropTypes as Types } from 'react'
import Icon from 'react-fa'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {
  similarYou
} from 'redux/actions/user'
import FollowUser from 'components/followUser'
import styles from './index.scss'

class DiscoverPeople extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }
  fetchUser () {
    if (this.state.fetchIng) return
    this.setState({
      fetchIng: true
    })
    this.props.similarYou(this.props.token).then(({response: {users}}) => {
      this.setState({
        fetchIng: false,
        users: users
      })
    })
  }
  componentDidMount () {
    this.fetchUser()
  }
  render () {
    return (
      <div className={styles.sidebarWeiget}>
        <p>
          Maybe your like
          <a onClick={this.fetchUser.bind(this)} className='u-pull-right'>
            {this.state.fetchIng ? 'loading' : <Icon name='refresh'/>}
          </a>
        </p>
        {this.state.users.map((k, i) => {
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
  token: Types.string.isRequired,
  similarYou: Types.func.isRequired
}

const select = (state) => {
  return {
    token: state.getIn(['UserStore', 'token'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    similarYou
  }
}
export default connect(select, mapDispatchToProps)(DiscoverPeople)
