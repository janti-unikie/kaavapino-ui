import React, { Component } from 'react'
import {
  Container,
  Image,
  Menu,
  Responsive,
  Sidebar,
  Grid
} from 'semantic-ui-react'
import NavLink from '../NavLink'
import { ReactComponent as HistogramIcon } from '../../../assets/histogram.svg'
import { ReactComponent as HistogramMobileIcon } from '../../../assets/histogram-mobile.svg'
import { ReactComponent as CheckListIcon } from '../../../assets/checklist.svg'
import { ReactComponent as CheckListMobileIcon } from '../../../assets/checklist-mobile.svg'
import { ReactComponent as PagesIcon } from '../../../assets/pages.svg'
import { ReactComponent as PagesMobileIcon } from '../../../assets/pages-mobile.svg'
import { ReactComponent as LogoutIcon } from '../../../assets/logout.svg'
import { ReactComponent as LogoutMobileIcon } from '../../../assets/logout-mobile.svg'
import { Button, IconMenuHamburger, IconCrossCircle } from 'hds-react'

class Header extends Component {
  state = {
    visible: false
  }

  setVisible(visibleSet) {
    this.setState({ visible: visibleSet })
  }

  render() {
    let { visible } = this.state
    return (
      <div className="navbar-container">
        <Menu className="navbar-menu borderless">
          <Container>
            <Menu.Item as="a" href="/" className="navbar-logo" header>
              <Image
                className="navbar-image"
                size="tiny"
                src="/helsinki.svg"
                style={{ marginRight: '1.5em' }}
              />
              Kaavapino
            </Menu.Item>
          </Container>
          <Responsive as={Menu.Menu} minWidth={800} position="right">
            <NavLink to="/">
              <HistogramIcon />
              <span>Yleisnäkymä</span>
            </NavLink>
            <NavLink to="/projects">
              <div className="navbar-item">
                <CheckListIcon />
                <span>Projektit</span>
              </div>
            </NavLink>
            <NavLink to="/reports">
              <div className="navbar-item">
                <PagesIcon />
                <span>Raportit</span>
              </div>
            </NavLink>
            <NavLink to="/Logout">
              <div className="navbar-item">
                <LogoutIcon />
                <span>Kirjaudu ulos</span>
              </div>
            </NavLink>
          </Responsive>
          <Responsive as={Menu.Menu} maxWidth={799} position="right">
            <Button
              className="navbar-responsive-button"
              variant='supplementary'
              iconLeft={<IconMenuHamburger/>}
              basic
              icon
              onClick={() => this.setVisible(true)}
            />
          </Responsive>
        </Menu>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          direction="right"
          onHide={() => this.setVisible(false)}
          onClick={() => this.setVisible(false)}
          vertical
          visible={visible}
          width="wide"
          className="borderless"
        >
          <Menu.Item>
            <Grid>
              <Grid.Column floated="left" width={1}>
                <Button
                  className="navbar-responsive-close-icon"
                  variant='supplementary'
                  iconLeft={ <IconCrossCircle />}
                  onClick={() => this.setVisible(false)}
                />
              </Grid.Column>
            </Grid>
          </Menu.Item>
          <NavLink to="/">
            <HistogramMobileIcon />
            <span>Yleisnäkymä</span>
          </NavLink>
          <NavLink to="/projects">
            <div className="navbar-item">
              <CheckListMobileIcon />
              <span>Projektit</span>
            </div>
          </NavLink>
          <NavLink to="/reports">
            <div className="navbar-item">
              <PagesMobileIcon />
              <span>Raportit</span>
            </div>
          </NavLink>
          <NavLink to="/Logout">
            <div className="navbar-item">
              <LogoutMobileIcon />
              <span>Kirjaudu ulos</span>
            </div>
          </NavLink>
        </Sidebar>
      </div>
    )
  }
}

export default Header
