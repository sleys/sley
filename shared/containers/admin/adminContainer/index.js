/**
 * Created by kee on 15/9/30.
 */
import React, { Component, PropTypes as Types } from 'react'
import { connect } from 'react-redux'

class AdminContainer extends Component {
  render () {
    return (
      <div>
        hello admin
      </div>
    )
  }
}
AdminContainer.propTypes = {
  auth: Types.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(AdminContainer)
