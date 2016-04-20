import 'react-simple-dropdown/styles/Dropdown.css'
import React, { Component, PropTypes as Types } from 'react'
import SimpleDropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

class Dropdown extends Component {
  render () {
    const {trigger, children, ...other} = this.props
    return (
      <SimpleDropdown {...other}>
        <DropdownTrigger>
          {trigger}
        </DropdownTrigger>
        <DropdownContent className={'animated ' + this.props.transitionName}>
            {children}
        </DropdownContent>
      </SimpleDropdown>
    )
  }
}
Dropdown.propTypes = {
  trigger: Types.element.isRequired,
  transitionName: Types.string,
  children: Types.any.isRequired
}
Dropdown.defaultProps = {
  transitionName: 'fadeIn'
}
export default Dropdown
