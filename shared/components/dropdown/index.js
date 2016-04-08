import 'react-simple-dropdown/styles/Dropdown.css'
import React, { Component, PropTypes as Types } from 'react'
import SimpleDropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

class Dropdown extends Component {
  render () {
    return (
      <SimpleDropdown {...this.props}>
        <DropdownTrigger>
          {this.props.trigger}
        </DropdownTrigger>
        <DropdownContent>
          <div className={'animated ' + this.props.transitionName}>
            {this.props.children}
          </div>
        </DropdownContent>
      </SimpleDropdown>
    )
  }
}
Dropdown.propTypes = {
  trigger: Types.element.isRequired,
  transitionName: Types.string,
  children: Types.element.isRequired
}
Dropdown.defaultProps = {
  transitionName: 'fadeIn'
}
export default Dropdown
