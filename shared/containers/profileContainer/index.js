import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'

class ProfileContainer extends Component {
  render () {
    return (
      <div className='content row'>
        <Helmet title='Profile'/>
        Profile
      </div>
    )
  }
}

export default ProfileContainer
