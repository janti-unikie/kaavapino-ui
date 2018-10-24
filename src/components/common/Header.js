import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle = () => this.setState((prevState) => ({ isOpen: !prevState.isOpen }))

  render() {
    return (
      <div className='navbar-container'>
        <Navbar color='white' light expand='md'>
          <NavbarBrand href='/'><b>Kaavapino</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/logout' className='navbar-logout-button'>
                  <FontAwesomeIcon icon='user' />
                  <span className='navbar-logout-text'>Kirjaudu ulos</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header