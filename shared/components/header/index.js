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

const Search = (props) => {
  return props.logind && (
    <Link to='/search'>
      <MdSearch />
    </Link>
  )
}

const Notification = (props) => {
  return props.logind && (
    <Link to='/notifications'>
      <MdNotificationsNone />
    </Link>
  )
}

const Touxiang = (props) => {
  return (
    <Dropdown
      trigger={
        <img src={props.user.avatarUrl} className={styles.avatar} width='45' height='45' />
      }
      transitionName='fadeIn'
    >
      <ul className={styles.userAction}>
        <li>
          <Link to='/setting'>设置</Link>
        </li>
        <li>
          <a href='javascript:void(0)' onClick={props.logout}><MdPerson />退出</a>
        </li>
      </ul>
    </Dropdown>
  )
}

Touxiang.propTypes = {
  user: Types.object.isRequired,
  logout: Types.func.isRequired
}

class Header extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    if (_.include(['/write'], this.props.pathname)) return null
    const showAuthCtrl = !_.include(['/login', '/register', '/forgot'], this.props.pathname)
    return (
      <Headroom tolerance={5} offset={100} classes={{
        initial: 'animated',
        pinned: 'slideInDown',
        unpinned: 'slideOutUp'
      }}>
        <header className={styles.header}>
          <div className={styles.headerWarp}>
            <div className='row'>
              <div className='three columns'>
                <Link to='/' className={styles.logo}>Sley</Link>{ /* <img src='' alt='' /> */}
              </div>
              <div className='nine columns'>
                <ul className={styles.headerList}>
                  <li>
                    <Search logind={this.props.logind} />
                  </li>
                  <li>
                    <Notification logind={this.props.logind} />
                  </li>
                  <li>
                    {this.props.logind ? <Touxiang user={this.props.user} logout={this.props.logout} /> : showAuthCtrl && (
                      <div className={styles.authAction}>
                        <a href='javscript:void(0)' onClick={this.props.showLoginModal} >登录</a>
                        <small> | </small>
                        <Link to='/register'>注册</Link>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </Headroom>
    )
  }
}

Header.propTypes = {
  loading: Types.bool.isRequired,
  logind: Types.bool.isRequired,
  logout: Types.func.isRequired,
  user: Types.object.isRequired,
  showLoginModal: Types.func.isRequired,
  pathname: Types.string.isRequired
}

const select = state => {
  const authState = state.get('UserStore')
  return {
    user: authState.get('user').toJS(),
    logind: authState.get('logind'),
    loading: authState.get('loading'),
    pathname: state.get('routing').locationBeforeTransitions.pathname
  }
}

const mapDispatchToProps = {
  logout,
  showLoginModal
}

export default connect(select, mapDispatchToProps)(Header)
