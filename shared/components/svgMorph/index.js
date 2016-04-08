import React, { Component, PropTypes as Types } from 'react'
import { MorphReplace } from 'react-svg-morph'

class SvgMorph extends Component {
  render () {
    return (
      <MorphReplace rotation='none'
                    fill='currentColor'
                    style={{verticalAlign: 'middle', width: '1em', height: '1em'}}
                    {...this.props}>
        {this.props.children}
      </MorphReplace>
    )
  }
}

SvgMorph.propTypes = {
  children: Types.element.isRequired
}

export default SvgMorph
