import 'styles/main.scss'
import 'styles/global.scss'
import React, { Component, PropTypes as Types } from 'react'
try {
  require('velocity-animate')
  require('velocity-animate/velocity.ui')
} catch (e) {}
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'
import { provideHooks } from 'redial'
import cookie from 'react-cookie'
import config from 'config'
import Header from 'components/header'
import GoTop from 'components/goTop'
import {
  hideLoginModal
} from 'redux/actions/global'
import {
  loadUserInfo
} from 'redux/actions/user'
import LoginModal from 'modals/loginModal'


@provideHooks({
  defer: ({dispatch, getState}) => {
    if (getState().getIn(['UserStore', 'logind'])) return
    const token = cookie.load('token')
    if (token) {
      return dispatch(loadUserInfo(token))
    }
  }
})
class RootContainer extends Component {
  render () {
    return (
      <div>
        <Helmet {...config.app.head} />
        <Header key={0} />
        <div>
          {this.props.children}
          <LoginModal isOpen={this.props.loginModal} onRequestClose={this.props.hideLoginModal} />
        </div>
        <div>
          <GoTop />
        </div>
      </div>
    )
  }
}

RootContainer.propTypes = {
  children: Types.element.isRequired,
  loginModal: Types.bool.isRequired,
  hideLoginModal: Types.func.isRequired
}
const select = state => {
  return {
    loginModal: state.getIn(['GlobalStore', 'showLoginModal'])
  }
}
const mapDispatchToState = dispatch => {
  return {
    hideLoginModal: bindActionCreators(hideLoginModal, dispatch)
  }
}
export default connect(select, mapDispatchToState)(RootContainer)
