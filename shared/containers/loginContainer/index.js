import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import {
  login
} from 'redux/actions/user'
import LoginForm from './loginForm'

class LoginContainer extends Component {
  constructor (props) {
    super(props)
    this.onHandleSubmit = this.onHandleSubmit.bind(this)
  }
  onHandleSubmit (values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(login(values, (e) => {
        e ? reject({_error: e}) : resolve()
      }))
    })
  }
  render () {
    return (
      <div className='content container'>
        <Helmet title='Login'/>
        <div className='offset-by-one-third five columns'>
          <LoginForm onSubmit={this.onHandleSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

LoginContainer.propTypes = {

}

const select = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(select, mapDispatchToProps)(LoginContainer)
