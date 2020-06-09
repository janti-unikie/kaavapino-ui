import React, { Component } from 'react'
import {
  Container,
  Image,
  Menu,
  Button,
  Responsive,
  Sidebar
} from 'semantic-ui-react'
import '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faTasks, faChartBar, faFileAlt, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavLink from './NavLink'

class Header extends Component {
  state = {
    visible: false
  }

  setVisible(visibleSet) {
    this.setState({ visible: visibleSet })
  }

  render() {
    let { visible } = this.state
    console.debug(Responsive.onlyMobile)
    return (
      <div className="navbar-container">
        <Menu className='navbar-menu borderless'>
          <Container>
            <Menu.Item as='a'className='navbar-logo' header>
              <Image className='navbar-image' size='tiny' src='/Helsinki.svg' style={{ marginRight: '1.5em' }} />
                            Kaavapino
            </Menu.Item>
          </Container>
          <Responsive as={Menu.Menu} minWidth={800} position='right'>
            <NavLink to='/'>
              <FontAwesomeIcon icon={faChartBar} />
              <span>Yleisnäkymä</span>
            </NavLink>
            <NavLink to='/projects'>
              <div className='navbar-item'>
                <FontAwesomeIcon icon={faTasks} />
                <span>Hankkeet</span>
              </div>
            </NavLink>
            <NavLink to='/reports'>
              <div className='navbar-item'>
                <FontAwesomeIcon icon={faFileAlt} />
                <span>Raportit</span>
              </div>
            </NavLink>
            <NavLink to='/Logout'>
              <div className='navbar-item'>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Kirjaudu ulos</span>
              </div>
            </NavLink>
          </Responsive>
          <Responsive as={Menu.Menu} maxWidth={800} position='right'>
            <Button className='navbar-responsive-button' basic icon onClick={() => this.setVisible(true)}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Responsive>
        </Menu>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          direction='right'
          onHide={() => this.setVisible(false)}
          vertical
          visible={visible}
          width='wide'
        >
          <NavLink to='/'>
            <FontAwesomeIcon icon={faChartBar} />
            <span>Yleisnäkymä</span>
          </NavLink>
          <NavLink to='/projects'>
            <div className='navbar-item'>
              <FontAwesomeIcon icon={faTasks} />
              <span>Hankkeet</span>
            </div>
          </NavLink>
          <NavLink to='/reports'>
            <div className='navbar-item'>
              <FontAwesomeIcon icon={faFileAlt} />
              <span>Raportit</span>
            </div>
          </NavLink>
          <NavLink to='/Logout'>
            <div className='navbar-item'>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Kirjaudu ulos</span>
            </div>
          </NavLink>
        </Sidebar>
      </div>
    )
  }
}

export default Header