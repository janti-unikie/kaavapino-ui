import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Status = ({ status }) => {
  let color
  if (status === 'Käynnistys') {
    color = '#00963b'
  } else if (status === 'OAS') {
    color = '#ffc61e'
  } else if (status === 'Ehdotus') {
    color = '#fd4f00'
  } else if (status === 'Tarkistettu ehdotus') {
    color = '#2400c7'
  } else if (status === 'Kanslia-Khs-Valtuusto') {
    color = 'black'
  } else {
    color = 'white'
  }
  return (
    <span className='project-status' style={{ backgroundColor: color, ...(color === 'white' && { border: '1px solid' }) }} />
  )
}

const ListHeader = () => {
  return (
    <div className='project-list-header'>
      <span className='header-item'>Nimi</span>
      <span className='header-item'>Vaihe</span>
      <span className='header-item'>Luotu</span>
      <span className='header-item'>Muokattu</span>
      <span className='header-item'>Koko</span>
      <span className='header-item'>Seuraava määräaika</span>
      <span className='header-item'>Luoja</span>
    </div>
  )
}

const DateItem = ({ value }) => {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return (
    <div className='date-container'>
      <span>{ `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}` }</span>
      <span>{ `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}` }</span>
    </div>
  )
}

const ListItem = ({ item }) => {
  const {  name, status, created, edited, size, nextDeadline, creator  } = item
  return (
    <div className='project-list-item'>
      <span><Status status={status} /> <Link className='project-name' to='/project'>{ name }</Link></span>
      <span>{ status }</span>
      <DateItem value={created} />
      <DateItem value={edited} />
      <span>{ size }</span>
      <DateItem value={nextDeadline} />
      <span>{ creator }</span>
      <Link className='project-list-button' to='/project/edit'><FontAwesomeIcon icon='pen'/>Muokkaa</Link>
    </div>
  )
}

class List extends Component {
  render() {
    const { items } = this.props
    return (
      <div className='project-list'>
        <ListHeader />
        { items.map((item, i) => {
          return <ListItem key={i} item={item} />
        }) }
      </div>
    )
  }
}

export default List