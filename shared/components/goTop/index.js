import React, {Component, PropTypes as Types} from 'react'
import styles from './index.scss'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import Headroom from 'react-headrooms'

class GoTop extends Component {
  constructor (props) {
    super(props)
    this.goTop = this.goTop.bind(this)
  }
  goTop () {
    window.scrollTo(0, 0)
  }
  render () {
    return (
      <Headroom tolerance={0} classes={{
        initial: 'animated',
        pinned: 'fadeIn',
        unpinned: 'fadeOut'
      }}>
        <a className={styles.goTop} onClick={this.goTop} >
          <MdArrowUpward />
        </a>
      </Headroom>
    )
  }
}

export default GoTop
