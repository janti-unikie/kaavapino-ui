import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from 'semantic-ui-react'
import Graph from './Graph'

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

const getArrowIcon = (dir) => dir === 0 ? <FontAwesomeIcon icon='angle-up'/> : <FontAwesomeIcon icon='angle-down'/>

const ListHeader = ({ filter, handleClick, selected, dir }) => {
  const items = ['Nimi', 'Vaihe', 'Seuraava määräaika', 'Koko', 'Muokattu', 'Vastuuhenkilö']
  return (
    <div className='project-list-header'>
      { items.map((item, i) => <span className='header-item' key={i} onClick={() => handleClick(i)}>{ item } { selected === i && getArrowIcon(dir) }</span>) }
      <Input onChange={(e) => filter(e.target.value)} icon='search' type='text' fluid placeholder='Haku' />
    </div>
  )
}

const formatDate = (value) => {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`
}

const DateItem = ({ value }) => {
  return (
    <div>
      <span>{ formatDate(value) }</span>
    </div>
  )
}

const ListItem = ({ item }) => {
  const {  id, name, status, edited, size, nextDeadline, responsibility  } = item
  return (
    <div className='project-list-item'>
      <span><Status status={status} /> <Link className='project-name' to={`/project/${id}`}>{ name }</Link></span>
      <span>{ status }</span>
      <DateItem value={nextDeadline} />
      <span>{ size }</span>
      <DateItem value={edited} />
      <span>{ responsibility }</span>
      <Link className='project-list-button' to={`/project/${id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</Link>
    </div>
  )
}

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
      sort: -1,
      dir: 0
    }
  }

  setFilter = (value) => this.setState({ filter: value })

  filterItems = (items) => {
    const { filter } = this.state
    const filtered = items.filter((item) => {
      let includes = false
      Object.keys(item).forEach((key) => {
        const i = String(isNaN(item[key]) ? item[key] : formatDate(new Date(item[key])))
        if (i.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) > -1) {
          includes = true
        }
      })
      return includes
    })
    return filtered
  }

  setSort = (type) => {
    this.setState((prevState) => {
      if (type === prevState.sort) {
        if (prevState.dir === 0) {
          return { dir: 1 }
        } else {
          return { dir: 0 }
        }
      }

      return { sort: type, dir: 0 }
    })
  }

  sortItems = (items) => {
    const { sort, dir } = this.state
    if (sort < 0) { return items }
    return items.sort((a, b) => {
      const item1 = a[Object.keys(a)[sort]]
      const item2 = b[Object.keys(b)[sort]]
      return dir === 0 ? item1 > item2 : item1 < item2
    })
  }

  render() {
    const { items, graph } = this.props
    const { sort, dir } = this.state
    const filteredItems = this.sortItems(this.filterItems(items))
    return (
      <div className='project-list'>
        <ListHeader selected={sort} dir={dir} handleClick={this.setSort} filter={this.setFilter} />
        { filteredItems.map((item, i) => {
          return <ListItem key={i} item={item} />
        }) }
        { filteredItems.length === 0 && <span className='empty-list-info'>Ei hankkeita!</span> }
        {graph && <Graph />}
      </div>
    )
  }
}

export default List