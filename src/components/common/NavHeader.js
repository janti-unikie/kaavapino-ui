import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavHeader extends Component {
  render = () => {
    let mockRoute = [ 'Etusivu', 'Kaavahankkeet' ]
    if (this.props.project) {
      mockRoute = mockRoute.concat(this.props.project)
    }

    if (this.props.edit) {
      mockRoute = mockRoute.concat('Muokkaa')
    }
    return (
      <div className='nav-header-container'>
        <div className='nav-header-inner-container'>
          <div className='nav-header-route'>
            <div className='nav-header-route-items'>
              { mockRoute.map((item, i) => {
                return <span key={i}><Link to='/'>{item}</Link></span>
              }) }
            </div>
          </div>
          <span className='nav-header-title'>{ this.props.title }</span>
          <div className='nav-header-actions'>
            { this.props.actions }
          </div>
        </div>
      </div>
    )
  }
}

export default NavHeader