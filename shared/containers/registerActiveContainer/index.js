import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {
  push
} from 'react-router-redux'
import {
  activeUser
} from 'api'

class RegisterActiveContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      success: false
    }
  }
  componentDidMount () {
    if (!this.props.token) {
      this.props.dispatch(push('/'))
    }
    activeUser(this.props.token).then(() => {
      this.setState({
        success: true
      })
    }).catch(e => {
      this.setState({
        error: e
      })
    })
  }
  render () {
    return (
      <div className='content row'>
        <Helmet title='Active User'/>
        {this.props.token ? (
          this.state.success ? (
            <div>
              激活成功，点击<Link to='/'>这里</Link>回到首页
            </div>
          ) : this.state.error
        ) : null}
      </div>
    )
  }
}

RegisterActiveContainer.propTypes = {
  token: Types.string,
  dispatch: Types.func.isRequired
}

const select = state => {
  return {
    token: state.get('routing').location.query.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(select, mapDispatchToProps)(RegisterActiveContainer)
