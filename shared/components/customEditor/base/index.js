/**
 * Created by kee on 15/11/06.
 */
import React, { Component, PropTypes as Types } from 'react'
import styles from './styles/index.styl'

class Defaults extends Component {
  render () {
    return (
      <div>
        <div className={styles.header}>
          <span className={styles.text}>{this.props.header}</span>
          <button className={'btn btn-close ' + styles.fr} onClick={this.props.onClose}>
            关闭
          </button>
        </div>
        <div className={styles.editorArea}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Defaults.propTypes = {
  onClose: Types.func.isRequired,
  header: Types.any,
  children: Types.any.isRequired
}

export default Defaults
