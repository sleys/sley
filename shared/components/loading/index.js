import React, { Component, PropTypes as Types } from 'react'
import IconBase from 'react-icon-base'

class loading extends Component {
  render () {
    return this.props.loading ? (
      <div className='la-ball-pulse-sync'>
          <div></div>
          <div></div>
          <div></div>
      </div>
    ) : null
  }
}

loading.propTypes = {
  loading: Types.bool.isRequired
}

export default loading
