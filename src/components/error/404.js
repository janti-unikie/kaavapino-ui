import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <p>Sivua ei löytynyt.</p>
      <Link to="/">Palaa tästä etusivulle.</Link>
    </div>
  )
}

export default NotFound
