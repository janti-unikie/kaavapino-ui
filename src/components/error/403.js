import React from 'react'
import { Link } from 'react-router-dom'

const Forbidden = () => {
  return (
    <div>
      <p>Ei vaadittavia oikeuksia tähän toimenpiteeseen.</p>
      <Link to="/">Palaa tästä etusivulle.</Link>
    </div>
  )
}

export default Forbidden
