/**
 * Created by kee on 15/10/30.
 */
import React, { Component, PropTypes as Types } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import styles from './styles/index.styl'

// function getMarkdownIt(done) {
//   require.ensure([], require=>{
//
//     const hljs = require('../../highlight')
//     // Synchronous highlighting with highlight.js
//     marked.setOptions({
//       gfm: true,
//       tables: true,
//       breaks: false,
//       pedantic: false,
//       sanitize: true,
//       smartLists: true,
//       smartypants: false,
//       highlight: function(code, lang) {
//         if (lang && hljs.getLanguage(lang)) {
//           try {
//             return hljs.highlight(lang, code).value
//           } catch (e) {
//             console.error(e)
//           }
//         }
//       }
//     })
//     return done({
//       hljs,
//       marked
//     })
//   })
// }

class Defaults extends Component {
  renderHeader () {
    const { create_time, _id } = this.props.post
    const time = moment(create_time).format('YYYY.MM.D  h:mm:ss a')
    return (
      <div className={styles.panel + ' ' + styles.header} >
        <div>
          <Link to={`/post/${_id}`} className={styles.time} title={moment(create_time).format('lll')}>
            {time}
          </Link>
        </div>
      </div>
    )
  }
  renderFooter () {
    const { _id } = this.props.post
    return (
      <div className={styles.panel}>
        <div className={styles.actions}>
          {!this.props.params._id ? (
            <Link className={styles.text + ' btn'} to={`/post/${_id}`}>详情</Link>
          ) : null}
        </div>
      </div>
    )
  }
  render () {
    return (
      <div className={styles.post}>
        {this.props.header ? this.renderHeader() : null}
        {this.props.children}
        {this.props.footer ? this.renderFooter() : null}
      </div>
    )
  }
}

Defaults.propTypes = {
  post: Types.object.isRequired,
  params: Types.object,
  header: Types.bool,
  footer: Types.bool,
  children: Types.any.isRequire
}

Defaults.defaultProps = {
  header: true
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Defaults)
