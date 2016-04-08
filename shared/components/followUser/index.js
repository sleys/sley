import _ from 'lodash'
import React, { Component, PropTypes as Types } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  follow,
  unFollow
} from 'redux/actions/user'

class FollowUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  showLoading () {
    this.setState({
      loading: true
    })
  }
  closeLoading () {
    this.setState({
      loading: false
    })
  }
  onFollow (follow_id, e) {
    this.showLoading()
    if (_.includes(this.props.user.following, follow_id)) {
      this.props.unFollow(follow_id, () => this.closeLoading())
      return
    }
    this.props.follow(follow_id, () => this.closeLoading())
  }
  renderStatus () {
    const { userInfo } = this.props
    if (this.props.user._id === userInfo._id) {
      return 'Me'
    }
    if (this.state.loading) return 'loading'
    if (_.includes(this.props.user.following, userInfo._id)) {
      return '取消关注'
    }
    return '关注'
  }
  render () {
    return (
      <button className={'button ' + this.props.className} onClick={this.onFollow.bind(this, this.props.userInfo._id)}>
        {this.renderStatus()}
      </button>
    )
  }
}

FollowUser.propTypes = {
  user: Types.object.isRequired,
  userInfo: Types.object.isRequired,
  follow: Types.func.isRequired,
  unFollow: Types.func.isRequired,
  className: Types.string
}
const select = state => {
  return {
    user: state.getIn(['UserStore', 'user']).toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    follow: bindActionCreators(follow, dispatch),
    unFollow: bindActionCreators(unFollow, dispatch)
  }
}

export default connect(select, mapDispatchToProps)(FollowUser)
