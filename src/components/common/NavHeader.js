import React, { Component } from 'react'

const mockRoute = [ 'Etusivu', 'Kaavahankkeet', 'Uusi kaavahanke' ]

class NavHeader extends Component {
  render = () => {
    return (
      <div className='nav-header-container'>
        <div className='nav-header-inner-container'>
          <div className='nav-header-route'>
            <div className='nav-header-route-items'>
              { mockRoute.map((item, i) => {
                return <span key={i}><a href='/'>{item}</a></span>
              }) }
            </div>
          </div>
          <span className='nav-header-title'>Uusi kaavahanke</span>
        </div>
      </div>
    )
  }
}

export default NavHeader