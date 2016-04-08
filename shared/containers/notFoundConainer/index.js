import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
class NotFoundConainer extends Component {
  render () {
    return (
      <div className='content row'>
        <Helmet title='Page not Found'/>
        not found
      </div>
    )
  }
}

export default NotFoundConainer
