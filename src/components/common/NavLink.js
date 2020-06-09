import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

class NavLink extends React.Component {
  render() {
    let isActive = this.context.router.route.location.pathname === this.props.to
    let className = isActive ? 'navbar-menu-item-active ' : ''

    return(
      <Menu.Item as={ Link } className={'navbar-menu-item ' + className} {...this.props}>
        {this.props.children}
      </Menu.Item>
    )
  }
}

NavLink.contextTypes = {
  router: PropTypes.object
}

export default NavLink