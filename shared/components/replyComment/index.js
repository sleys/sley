import React, { Component, PropTypes as Types } from 'react'
import Textarea from 'react-textarea-autosize'
import {
  VelocityTransitionGroup
} from 'velocity-react'
import styles from './index.scss'

const enterAnimation = {
  animation: 'transition.slideLeftIn',
  stagger: 50,
  duration: 400,
  display: 'block',
  style: {
    display: 'none'
  }
}
const leaveAnimation = {
  animation: 'transition.slideRightOut',
  stagger: 50,
  duration: 400
}

class ReplyComment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit (e) {
    e.preventDefault()
  }
  render () {
    const from = (
      <div key={0} className='box' style={{marginBottom: '10px'}}>
        <Textarea className={'textarea-autoHeight ' + styles.replyTextArea}
                  placeholder={`@${this.props.reply}:`}
                  value={this.state.comment}
                  onChange={e => this.setState({comment: e.target.value})}
                  autofocus
                  useCacheForDOMMeasurements />
      </div>
    )
    const sub = (
      <div key={1}>
        <button type='submit' className='button-primary'>回复</button>
      </div>
    )
    const dd = [from, sub]
    return (
      <form onSubmit={this.onSubmit}>
        <VelocityTransitionGroup component='div'
                                enter={enterAnimation}
                                leave={leaveAnimation}>
          {this.props.show && dd}
        </VelocityTransitionGroup>
      </form>
    )
  }
}

ReplyComment.propTypes = {
  reply: Types.string.isRequired,
  show: Types.bool.isRequired
}

export default ReplyComment
