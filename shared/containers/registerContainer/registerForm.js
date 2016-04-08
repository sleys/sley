import React, { Component, PropTypes as Types } from 'react'
import { Link } from 'react-router'
import Icon from 'react-fa'
import { reduxForm } from 'redux-form'
import styles from './index.scss'
import baseStyle from '../loginContainer/index.scss'

const loginValidation = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = '邮箱不能为空'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '错误的邮箱地址'
  }
  if (!values.nickname) {
    errors.nickname = '昵称不能为空'
  } else if (values.nickname.length < 2) {
    errors.nickname = '你就这么短？'
  }

  if (!values.password) {
    errors.password = '密码不能为空'
  } else if (values.password.length > 20) {
    errors.password = '密码最长不超过20位'
  } else if (values.password.length < 6) {
    errors.password = '密码长度小于6位'
  }

  if (!values.password_re) {
    errors.password_re = '请输入确定密码'
  }
  if (values.password_re !== values.password) {
    errors.password_re = '确认密码不一致'
  }
  return errors
}

class RegisterForm extends Component {
  render () {
    const {fields: {email, nickname, password, password_re}, error, handleSubmit, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div className={baseStyle.content}>
          <span className={baseStyle.title}>
            <Icon name='user' /> 注册
          </span> - Kingsley
        </div>
        <div className='u-full-width'>
          <label> 邮箱
            {email.touched && email.error && <span className={baseStyle.errorText}>{email.error}</span>}
          </label>
          <input className='u-full-width'
                 type='email'
                 placeholder='Email'
                 {...email} />
        </div>
        <div className='u-full-width'>
          <label> 昵称
            {nickname.touched && nickname.error && <span className={baseStyle.errorText}>{nickname.error}</span>}
          </label>
          <input className='u-full-width'
                type='text'
                placeholder='Nickname'
                {...nickname} />
        </div>
        <div className='u-full-width'>
          <label>
            密码
            {password.touched && password.error && <span className={baseStyle.errorText}>{password.error}</span>}
          </label>
          <input className='u-full-width'
                type='password'
                placeholder='Password'
                {...password} />
        </div>
        <div className='u-full-width'>
          <label> 确认密码
            {password_re.touched && password_re.error && <span className={baseStyle.errorText}>{password_re.error}</span>}
          </label>
          <input className='u-full-width'
                type='password'
                placeholder='Confirm password'
                {...password_re} />
        </div>
        {error && <p className={baseStyle.errorText}>{error}</p>}
        <button type='submit'
                className='button-primary'
                disabled={submitting}>
          {submitting ? 'loading' : '注册'}
        </button>
        <Link to='/login'
              className={'button u-pull-right'} >
          登录
        </Link>
        <div className={styles.about}>
          <Link to='/about' title='about'><Icon name='info-circle'/></Link>
        </div>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  fields: Types.object.isRequired,
  error: Types.string,
  handleSubmit: Types.func.isRequired,
  submitting: Types.bool.isRequired
}

export default reduxForm({
  form: 'register',
  fields: ['email', 'nickname', 'password', 'password_re'],
  validate: loginValidation,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(RegisterForm)
