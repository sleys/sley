import React, { PropTypes as Types } from 'react'
import Modal from 'react-modal'
import {
  login
} from 'redux/actions/user'
import LoginForm from 'containers/loginContainer/loginForm'

const style = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '400px',
    marginLeft: '-200px',
    marginTop: '-200px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '2px',
    outline: 'none',
    padding: '20px'
  }
}
const LoginModal = (props) => {
  const handle = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(login(values, (e) => {
        e ? reject({_error: e}) : resolve()
      }))
    }).then(() => {
      return dispatch(props.onRequestClose())
    })
  }
  return (
    <Modal {...props} style={style} className='animated slideInDown '>
      <LoginForm onSubmit={handle} onRequestClose={props.onRequestClose}/>
    </Modal>
  )
}

LoginModal.propTypes = {
  onRequestClose: Types.func.isRequired
}

export default LoginModal
