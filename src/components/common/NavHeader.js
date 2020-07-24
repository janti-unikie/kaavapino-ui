import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'

export const NavAction = ({ children, to, primary, ...rest }) => {
  const buttonClassname = primary ? 'primary' : 'secondary'

  return to ? (
    <Link className={`action-item ui button large ${buttonClassname}`} to={to}>
      {children}
    </Link>
  ) : (
    <span {...rest} className={`action-item ui button large ${buttonClassname}`}>
      {children}
    </span>
  )
}

NavAction.propTypes = {
  to: PropTypes.string
}

export const NavActions = props => <div className="nav-header-actions" {...props} />

export const NavHeader = ({ routeItems, actions, large, title, info, infoOptions }) => {
  return (
    <div className="nav-header-container">
      <div className="nav-header-inner-container">
        <div className="nav-header-route">
          <div className="nav-header-route-items">
            {routeItems.map((item, i) => {
              return (
                <span key={i}>
                  <Link to={item.path}>{item.value}</Link>
                </span>
              )
            })}
          </div>
        </div>
        <div className="nav-header-content">
          <span className={`nav-header-title${large ? ' large' : ''}`}>{title}</span>
          <div className="nav-header-info">
            {info && <Dropdown text={info} options={infoOptions} scrolling />}
          </div>
        </div>
        {actions && actions}
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
