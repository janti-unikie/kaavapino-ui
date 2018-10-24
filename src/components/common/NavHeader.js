import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const NavAction = ({ children, to, ...rest }) => {
  return (
    <span {...rest} className='action-item'>
      { to ? <Link to={to}>{ children }</Link> : children }
    </span>
  )
}

NavAction.propTypes = {
  to: PropTypes.string
}

export const NavHeader = ({ routeItems, actions, large, title }) => {
  return (
    <div className='nav-header-container'>
      <div className='nav-header-inner-container'>
        <div className='nav-header-route'>
          <div className='nav-header-route-items'>
            { routeItems.map((item, i) => {
              return <span key={i}><Link to={item.path}>{item.value}</Link></span>
            }) }
          </div>
        </div>
        <span className={`nav-header-title ${ large ? 'large' : '' }`}>{ title }</span>
        <div className='nav-header-actions'>
          { actions.map((action, i) => React.cloneElement(action, { key: i })) }
        </div>
      </div>
    </div>
  )
}

NavHeader.propTypes = {
  routeItems: PropTypes.array,
  actions: PropTypes.array,
  large: PropTypes.bool,
  title: PropTypes.string
}