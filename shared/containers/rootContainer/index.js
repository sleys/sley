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
import Header from 'components/header'
import GoTop from 'components/goTop'
import {
  hideLoginModal
} from 'redux/actions/global'
import LoginModal from 'modals/loginModal'

class RootContainer extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Helmet title=''
                titleTemplate='%s - sley.com' />
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
