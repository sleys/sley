import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
class NotificationContainer extends Component {
  render () {
    return (
      <div className='content row'>
        <Helmet title='Notification'/>
        Notification
      </div>
    )
  }
}

export default NotificationContainer
