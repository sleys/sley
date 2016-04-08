import React, { Component, PropTypes as Types } from 'react'
import ForgotForm from './forgotForm'

class ForgotPassContainer extends Component {
  constructor (props) {
    super(props)
    this.onHandleSubmit = this.onHandleSubmit.bind(this)
  }
  onHandleSubmit (values, dispatch) {
    return new Promise((resolve, reject) => {
    })
  }
  render () {
    return (
      <div className='content container'>
        <div className='offset-by-one-third five columns'>
          <ForgotForm onSubmit={this.onHandleSubmit} />
        </div>
      </div>
    )
  }
}

export default ForgotPassContainer
