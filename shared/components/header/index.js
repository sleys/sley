import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Headroom from 'react-headrooms'
import MdSearch from 'react-icons/lib/md/search'
import MdPerson from 'react-icons/lib/md/person'
import MdNotificationsNone from 'react-icons/lib/md/notifications-none'
import {
  logout
} from 'redux/actions/user'
import {
  showLoginModal
} from 'redux/actions/global'
import Dropdown from 'components/dropdown'
import styles from './index.scss'

class Header extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const UserAction = (props) => {
      return (
        <ul className={styles.userAction}>
          <li>
            <Link to='/setting'>设置</Link>
          </li>
          <li>
            <a href='javascript:void(0)' onClick={props.logout}><MdPerson />退出</a>
          </li>
        </ul>
      )
    }
    const search = this.props.logind ? (
      <li>
        <Link to='/search'>
          <MdSearch />
        </Link>
      </li>
    ) : null
    const notification = this.props.logind ? (
      <li>
        <Link to='/notifications'>
          <MdNotificationsNone />
        </Link>
      </li>
    ) : null
    const touxiang = this.props.logind ? (
        <li>
          <Dropdown
            trigger={
              <img src={this.props.user.avatarUrl} className={styles.avatar} width='45' height='45' />
            }
            transitionName='fadeIn'
          >
            <UserAction user={this.props.user} logout={this.props.logout} />
          </Dropdown>
        </li>
    ) : !_.include(['/login', '/register', '/forgot'], this.props.pathname) && (
      <div className={styles.authAction}>
        <a href='javscript:void(0)' onClick={this.props.showLoginModal} >登录</a>
        <small> | </small>
        <Link to='/register'>注册</Link>
      </div>
    )
    const header = (
      <header className={styles.header}>
        <div className={styles.headerWarp}>
          <div className='row'>
            <div className='three columns'>
              <Link to='/' className={styles.logo}>Sley</Link>{ /* <img src='' alt='' /> */}
            </div>
            <div className='nine columns'>
              <ul className={styles.headerList}>
                {search}
                {notification}
                {touxiang}
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
    return this.props.showHeader ? (
      <Headroom tolerance={5} offset={100} classes={{
        initial: 'animated',
        pinned: this.props.pathname !== 'write' ? 'slideInDown' : '',
        unpinned: this.props.pathname !== 'write' ? 'slideOutUp' : ''
      }}>
        {header}
      </Headroom>
    ) : <div />
  }
}

Header.propTypes = {
  loading: Types.bool.isRequired,
  logind: Types.bool.isRequired,
  logout: Types.func.isRequired,
  user: Types.object.isRequired,
  showHeader: Types.bool.isRequired,
  showLoginModal: Types.func.isRequired,
  pathname: Types.string.isRequired
}

const select = state => {
  const authState = state.get('UserStore')
  return {
    user: authState.get('user').toJS(),
    logind: authState.get('logind'),
    loading: authState.get('loading'),
    showHeader: state.getIn(['GlobalStore', 'showHeader']),
    pathname: state.get('routing').locationBeforeTransitions.pathname
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logout, dispatch),
    showLoginModal: bindActionCreators(showLoginModal, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(Header)
