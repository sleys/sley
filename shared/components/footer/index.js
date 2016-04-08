import React, { Component, PropTypes as Types } from 'react'

export default class Footer extends Component {
  render () {
    return (
      <div key={this.props.key} style={{textAlign: 'center', color: 'white', height: '70px', fontSize: '17px'}}>
        Designed & Powerd by <a href='http://weibo.com/u/2122018774' style={{color: 'rgb(52, 245, 205)'}}>xiaokekeT</a>
        <p>Github: <a href='github.com/xiaokekeT' style={{color: '#fff'}}>xiaokekekT</a></p>
      </div>
    )
  }
}
Footer.propTypes = {
  key: Types.number
}
