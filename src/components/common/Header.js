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
              <svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>iconmonstr-chart-2</title>
                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Navigaatio-/-Hankkeet-" transform="translate(-850.000000, -23.000000)">
                    <g id="Header">
                      <g>
                        <g>
                          <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="1440" height="64"></rect>
                          <g id="organisms/navigation/desktop">
                            <rect id="Rectangle-2-Copy-11" fill="#CFE4F5" x="0" y="0" width="1440" height="64"></rect>
                            <g id="Group-24" transform="translate(850.000000, 23.000000)" fill="#000000">
                              <g id="Group-35">
                                <g id="iconmonstr-chart-2">
                                  <path d="M4.16666667,6.66666667 L4.16666667,13.3333333 L2.5,13.3333333 L2.5,6.66666667 L4.16666667,6.66666667 Z M5.83333333,5 L0.833333333,5 L0.833333333,15 L5.83333333,15 L5.83333333,5 Z M10.8333333,1.66666667 L10.8333333,13.3333333 L9.16666667,13.3333333 L9.16666667,1.66666667 L10.8333333,1.66666667 Z M12.5,0 L7.5,0 L7.5,15 L12.5,15 L12.5,0 Z M17.5,10.8333333 L17.5,13.3333333 L15.8333333,13.3333333 L15.8333333,10.8333333 L17.5,10.8333333 Z M19.1666667,9.16666667 L14.1666667,9.16666667 L14.1666667,15 L19.1666667,15 L19.1666667,9.16666667 Z M20,16.6666667 L0,16.6666667 L0,18.3333333 L20,18.3333333 L20,16.6666667 Z" id="Shape"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Yleisnäkymä</span>
            </NavLink>
            <NavLink to='/projects'>
              <div className='navbar-item'>
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Navigaatio-/-Hankkeet-" transform="translate(-1009.000000, -22.000000)">
                      <g id="Header">
                        <g>
                          <g>
                            <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="1440" height="64"></rect>
                            <g id="organisms/navigation/desktop">
                              <rect id="Rectangle-2-Copy-11" fill="#CFE4F5" x="0" y="0" width="1440" height="64"></rect>
                              <g id="Group-23" transform="translate(1009.000000, 22.000000)" fill="#000000" fillRule="nonzero">
                                <g id="iconmonstr-task-1">
                                  <path d="M18.3333333,1.66666667 L18.3333333,18.3333333 L1.66666667,18.3333333 L1.66666667,1.66666667 L18.3333333,1.66666667 Z M20,0 L0,0 L0,20 L20,20 L20,0 Z M16.6666667,5.83333333 L10,5.83333333 L10,6.66666667 L16.6666667,6.66666667 L16.6666667,5.83333333 Z M16.6666667,10 L10,10 L10,10.8333333 L16.6666667,10.8333333 L16.6666667,10 Z M16.6666667,14.1666667 L10,14.1666667 L10,15 L16.6666667,15 L16.6666667,14.1666667 Z M7.90333333,4.74666667 L7.31166667,4.16666667 L5.18416667,6.33916667 L3.90166667,5.12916667 L3.32,5.72083333 L5.195,7.5 L7.90333333,4.74666667 L7.90333333,4.74666667 Z M7.90333333,8.91333333 L7.31166667,8.33333333 L5.185,10.5058333 L3.9025,9.29583333 L3.32083333,9.88666667 L5.195,11.6666667 L7.90333333,8.91333333 L7.90333333,8.91333333 Z M7.90333333,13.08 L7.31166667,12.5 L5.185,14.6725 L3.9025,13.4625 L3.32083333,14.0533333 L5.195,15.8333333 L7.90333333,13.08 L7.90333333,13.08 Z" id="Shape"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Hankkeet</span>
              </div>
            </NavLink>
            <NavLink to='/reports'>
              <div className='navbar-item'>
                <svg width="21px" height="22px" viewBox="0 0 21 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Navigaatio-/-Hankkeet-" transform="translate(-1147.000000, -20.000000)">
                      <g id="Header">
                        <g>
                          <g>
                            <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="1440" height="64"></rect>
                            <g id="organisms/navigation/desktop">
                              <rect id="Rectangle-2-Copy-11" fill="#CFE4F5" x="0" y="0" width="1440" height="64"></rect>
                              <g id="Group-22" transform="translate(1147.000000, 20.000000)">
                                <g id="atoms/icons/hankkeet-copy">
                                  <polygon id="Fill-79-Copy" fill="#000000" points="18.4964395 17.007065 5.87123589 17.007065 5.87123589 1.85584326 18.4964395 1.85584326 18.4964395 0.340232371 4.355625 0.340232371 4.355625 18.5226759 20.0114395 18.5226759 20.0114395 0.340232371 18.4964395 0.340232371"></polygon>
                                  <rect id="Rectangle" fill="#CFE4F5" x="0.4715892" y="4.16625" width="14.3925" height="17.04375"></rect>
                                  <polygon id="Fill-79" fill="#000000" points="14.1408145 20.4568984 1.51561089 20.4568984 1.51561089 5.30567661 14.1408145 5.30567661 14.1408145 3.79006573 0 3.79006573 0 21.9725093 15.6558145 21.9725093 15.6558145 3.79006573 14.1408145 3.79006573"></polygon>
                                  <path d="M3.47228226,7.23989908 L12.1835323,7.23989908 L12.1835323,9.03710496 L3.47228226,9.03710496 L3.47228226,7.23989908 Z M3.47228226,16.72547 L12.1835323,16.72547 L12.1835323,18.5226759 L3.47228226,18.5226759 L3.47228226,16.72547 Z M3.47228226,11.9828888 L12.1835323,11.9828888 L12.1835323,13.7800947 L3.47228226,13.7800947 L3.47228226,11.9828888 Z" id="Shape" fill="#000000" fillRule="nonzero"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Raportit</span>
              </div>
            </NavLink>
            <NavLink to='/Logout'>
              <div className='navbar-item'>
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>atoms/icons/logout</title>
                  <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Navigaatio-/-Hankkeet-" transform="translate(-1277.000000, -22.000000)">
                      <g id="Header">
                        <g>
                          <g>
                            <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="1440" height="64"></rect>
                            <g id="organisms/navigation/desktop">
                              <rect id="Rectangle-2-Copy-11" fill="#CFE4F5" x="0" y="0" width="1440" height="64"></rect>
                              <g id="Group-21" transform="translate(1277.000000, 22.000000)" fill="#000000" fillRule="nonzero">
                                <g id="atoms/icons/logout">
                                  <g id="Group">
                                    <g id="Shape">
                                      <g>
                                        <g transform="translate(0.406058, 0.406058)">
                                          <path d="M0,0.000186786521 L11.2071912,0.000186786521 L11.2071912,1.86805199 L1.86786521,1.86805199 L1.86786521,16.8109736 L11.2071912,16.8109736 L11.2071912,18.6788388 L1.86786521,18.6788388 L0,18.6788388 L0,16.8109736 L0,1.86805199 L0,0.000186786521 Z M12.0743476,5.37711696 L13.3958623,4.05653625 L17.3576044,8.01921231 L18.6781851,9.33979299 L17.3576044,10.6603737 L13.3958623,14.6221158 L12.0743476,13.3015351 L15.1030911,10.2737256 L4.67012997,10.2737256 L4.67012997,8.4058604 L15.1030911,8.4058604 L12.0743476,5.37711696 Z"></path>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
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