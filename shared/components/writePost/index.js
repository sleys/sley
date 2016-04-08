import React, { Component, PropTypes as Types } from 'react'
import { Link } from 'react-router'
import Icon from 'react-fa'
import Modal from 'react-modal'
import styles from './index.scss'

const customStyles = {
  content: {
    top: '30%',
    left: 'calc(50% - 240px)',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    borderRadius: '2px',
    width: '440px',
    height: '150px',
    backgroundColor: 'rgb(7, 210, 143)',
    color: '#fff'
    // transform: 'translate(-50%, -50%)'
  }
}

class WritePost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      isOpen: false
    }
    this.showCreate = this.showCreate.bind(this)
    this.showShare = this.showShare.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
  }
  showCreate () {

  }
  showShare () {
    this.setState({
      isOpen: true
    })
  }
  onCloseModal () {
    this.setState({
      isOpen: false
    })
  }
  render () {
    return (
      <div className={'u-max-full-width ' + styles.container}>
        <Link to='write'>
          <div className={styles.create}>
            <div className={styles.createIcon} onClick={this.showCreate}>
              <Icon name='pencil-square-o'/>
            </div>
            Write
          </div>
        </Link>
        <div className={styles.share} onClick={this.showShare}>
          <div className={styles.shareIcon}>
            <Icon name='chain'/>
          </div>
          Share
        </div>
        {this.state.isOpen ? (
          <Modal isOpen={this.state.isOpen}
                 onRequestClose={this.onCloseModal}
                 style={customStyles} className='animated bounce'>
            1
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default WritePost
