import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavHeader extends Component {
  render = () => {
    let mockRoute = [ { value: 'Etusivu', path: '/' }, { value: 'Kaavahankkeet', path: '/' } ]
    const { largeTitle, id } = this.props
    if (this.props.project) {
      mockRoute = mockRoute.concat({ value: this.props.project, path: `/project/${id}` })
    }

    if (this.props.edit) {
      mockRoute = mockRoute.concat({ value: 'Muokkaa', path: `/project/${id}/edit` })
    }
    return (
      <div className='nav-header-container'>
        <div className='nav-header-inner-container'>
          <div className='nav-header-route'>
            <div className='nav-header-route-items'>
              { mockRoute.map((item, i) => {
                return <span key={i}><Link to={item.path}>{item.value}</Link></span>
              }) }
            </div>
          </div>
          <span className={`nav-header-title ${ largeTitle ? 'large' : '' }`}>{ this.props.title }</span>
          <div className='nav-header-actions'>
            { this.props.actions }
          </div>
        </div>
      </div>
    )
  }
}

export default NavHeader