import React, { Component, PropTypes as Types } from 'react'
import IconBase from 'react-icon-base'

class loading extends Component {
  render () {
    return this.props.loading ? (
      <IconBase viewBox='0 0 40 40' {...this.props}>
        <g>
          <path opacity='0.2' fill='#000' d='M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z' />
          <path fill='#000' d='M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z' transform='rotate(35.2366 20 20)'>
          </path>
        </g>
      </IconBase>
    ) : null
  }
}

loading.propTypes = {
  loading: Types.bool.isRequired
}

export default loading
