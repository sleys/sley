import React, { Component, PropTypes as Types } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import Icon from 'react-fa'
import styles from './index.scss'

const loginValidation = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = '邮箱不能为空'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '错误的邮箱地址'
  }

  if (!values.password) {
    errors.password = '密码不能为空'
  }

  return errors
}

class LoginForm extends Component {
  render () {
    const {fields: {email, password, remember}, error, handleSubmit, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <span className={styles.title}>
            <Icon name='sign-in' /> 登录
          </span> - Sley
          {this.props.onRequestClose && (
            <Icon name='close'
                className={'u-pull-right ' + styles.close }
                onClick={this.props.onRequestClose}
            />
          )}
        </div>
        <div className='u-full-width'>
          <label className={styles.label}>
            <Icon name='envelope-o'/> 邮箱
            {email.touched && email.error && <span className={styles.errorText}>{email.error}</span>}
          </label>
          <input className='u-full-width'
                 type='email'
                 placeholder='Email'
                 {...email} />
        </div>
        <div className='u-full-width'>
          <label className={styles.label}>
            <Icon name='eye'/> 密码
            {password.touched && password.error && <span className={styles.errorText}>{password.error}</span>}
          </label>
          <input className='u-full-width'
                 type='password'
                 placeholder='Password'
                 {...password} />
        </div>
        <div className={'u-full-width ' + styles.info }>
          <label>
            <input type='checkbox' {...remember} defaultChecked style={{marginBottom: '5px'}}/> 记住我
            <Link to='/forgot'
                  className='u-pull-right'
                  onClick={this.props.onRequestClose ? this.props.onRequestClose : function () {}}>
              忘记密码
            </Link>
          </label>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <button className='button-primary'
                type='submit'
                disabled={submitting}>
          {submitting ? 'loading' : '登录'}
        </button>
        <Link to='/register'
              className={'button ' + styles.goRegister}
              onClick={this.props.onRequestClose ? this.props.onRequestClose : function () {}}>
          注册
        </Link>
      </form>
    )
  }
}

LoginForm.propTypes = {
  fields: Types.object.isRequired,
  error: Types.string,
  handleSubmit: Types.func.isRequired,
  submitting: Types.bool.isRequired,
  onRequestClose: Types.func
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password', 'remember'],
  validate: loginValidation,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(LoginForm)
