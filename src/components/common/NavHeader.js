import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const NavAction = ({ children, to, ...rest }) => {
  return to ?
    <Link className='action-item' to={to}>{ children }</Link> :
    (
      <span {...rest} className='action-item'>
        { children }
      </span>
    )
}

NavAction.propTypes = {
  to: PropTypes.string
}

export const NavActions = (props) => <div className='nav-header-actions' {...props} />

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
        { actions && actions }
      </div>
    </div>
  )
}

NavHeader.propTypes = {
  routeItems: PropTypes.array,
  actions: PropTypes.object,
  large: PropTypes.bool,
  title: PropTypes.string
}