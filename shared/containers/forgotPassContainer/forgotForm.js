import React, { Component, PropTypes as Types } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import Icon from 'react-fa'
import styles from './index.scss'
import baseStyle from '../loginContainer/index.scss'

const loginValidation = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = '邮箱不能为空'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '错误的邮箱地址'
  }

  if (!values.captcha) {
    errors.captcha = '验证码错误'
  }

  return errors
}

class ForgotForm extends Component {
  render () {
    const {fields: {email, captcha}, error, handleSubmit, submitting} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div className={baseStyle.content}>
          <span className={baseStyle.title}>
            <Icon name='street-view' /> 找回密码
          </span> - Kingsley
        </div>
        <div className='u-full-width'>
          <label className={baseStyle.label}>
            <Icon name='envelope-o'/> 邮箱
            {email.touched && email.error && <span className={baseStyle.errorText}>{email.error}</span>}
          </label>
          <input className='u-full-width'
                 type='email'
                 placeholder='Email'
                 {...email} />
        </div>
        <div className='u-full-width'>
          <label className={baseStyle.label}>
            <Icon name='eye'/> 验证码
            {captcha.touched && captcha.error && <span className={baseStyle.errorText}>{captcha.error}</span>}
          </label>
          <div className='row'>
            <input className='six columns'
                  type='text'
                  placeholder='Captcha'
                  {...captcha} />
            <img className='six columns' />
           </div>
        </div>
        {error && <p className={baseStyle.errorText}>{error}</p>}
        <button className='button-primary'
                type='submit'
                disabled={submitting}>
          {submitting ? 'loading' : '提交'}
        </button>
        <div className={styles.login}>
          <Link to='/login'>&nbsp;&nbsp;登录</Link>
          { ' | ' }
          <Link to='/'>返回首页</Link>
        </div>
      </form>
    )
  }
}

ForgotForm.propTypes = {
  fields: Types.object.isRequired,
  error: Types.string,
  handleSubmit: Types.func.isRequired,
  submitting: Types.bool.isRequired
}

export default reduxForm({
  form: 'forgot',
  fields: ['email', 'captcha'],
  validate: loginValidation,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(ForgotForm)
