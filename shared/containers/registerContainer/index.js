import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import {
  register
} from 'redux/actions/user'
import Icon from 'react-fa'
import RegisterForm from './registerForm'
import styles from './index.scss'

class RegisterContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      success: false,
      email: ''
    }
    this.onHandleSubmit = this.onHandleSubmit.bind(this)
    this.renderSuccess = this.renderSuccess.bind(this)
  }
  onHandleSubmit (values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(register(values, (e) => {
        console.log(e)
        e ? reject({_error: e}) : resolve()
      }))
    }).then(() => {
      this.setState({
        success: true,
        email: values.email
      })
    })
  }
  renderSuccess () {
    return (
      <div>
        <div>
          <p>Sley</p>
        </div>
        <div className={styles.sendEmail}>
          <p><Icon name='check'/> 感谢您的注册，我们已向您的邮箱</p>
          <p>{this.state.email}发了一封验证邮件, 请您进入邮箱验证</p>
        </div>
      </div>
    )
  }
  render () {
    return (
      <div className='content container'>
        <Helmet title='Register'/>
        <div className='offset-by-one-third five columns'>
          {this.state.success && this.state.email ? this.renderSuccess() : <RegisterForm onSubmit={this.onHandleSubmit.bind(this)}/> }
        </div>
      </div>
    )
  }
}

RegisterContainer.propTypes = {

}

const select = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(select, mapDispatchToProps)(RegisterContainer)
