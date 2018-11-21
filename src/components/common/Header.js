import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

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
        <Link to='/' className='navbar-title'>Kaavapino</Link>
        <div className='navbar-logout-button'>
          <Link to='/logout'>
            <FontAwesomeIcon icon='user' />
            <span className='navbar-logout-text'>Kirjaudu ulos</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default Header