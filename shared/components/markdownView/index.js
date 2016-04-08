import React, { Component, PropTypes as Types } from 'react'
import marked from 'marked'
import cls from 'classnames'

class MarkdownView extends Component {
  render () {
    const renderMarkdownPerview = (content) => {
      return {
        __html: marked(content)
      }
    }
    const c = cls({
      'markdown-body': true,
      'inner': this.props.inner
    })
    return (
      <div className={c}
           dangerouslySetInnerHTML={renderMarkdownPerview(this.props.content)}/>
    )
  }
}

MarkdownView.propTypes = {
  content: Types.string.isRequired,
  inner: Types.bool
}

MarkdownView.defaultProps = {
  inner: false
}

export default MarkdownView
