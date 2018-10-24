import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from 'semantic-ui-react'
import Graph from '../common/Graph'

const data = [
  { title: 'Vallilanlaakson raitiotie', phases: [ new Date(2017, 10, 1), new Date(2018, 6, 1), new Date(2018, 11, 1), new Date(2019, 2, 1), new Date(2019, 3, 1), new Date(2019, 5, 1), new Date(2019, 8, 1) ] },
  { title: 'Testitie 27', phases: [ new Date(2018, 3, 1), new Date(2018, 5, 1), new Date(2018, 7, 1), new Date(2018, 9, 1), new Date(2018, 10, 1), new Date(2018, 11, 1), new Date(2019, 2, 1) ] },
  { title: 'Testi 10', phases: [ new Date(2017, 9, 1), new Date(2018, 3, 1), new Date(2018, 5, 1), new Date(2018, 10, 1), new Date(2019, 3, 1), new Date(2019, 5, 1), new Date(2019, 6, 1) ] }
]

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
  const items = ['Nimi', 'Vaihe', 'Seuraava määräaika', 'Koko', 'Muokattu', 'Vastuuhenkilö', 'Viimeisin kommentti']
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

const convertSizeToText = (size) => {
  switch (size) {
    case 0:
      return 'XS'
    case 1:
      return 'S'
    case 2:
      return 'M'
    case 3:
      return 'L'
    case 4:
      return 'XL'
  }
}

const ListItem = ({ item }) => {
  const {  id, name, status, edited, size, nextDeadline, responsibility, latestComment  } = item
  return (
    <div className='project-list-item'>
      <span className='project-list-item-name'><Status status={status} /> <Link className='project-name' to={`/project/${id}`}>{ name }</Link></span>
      <span>{ status }</span>
      <DateItem value={nextDeadline} />
      <span>{ convertSizeToText(size) }</span>
      <DateItem value={edited} />
      <span>{ responsibility }</span>
      <DateItem value={latestComment} />
      <Link className='project-list-button' to={`/project/${id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</Link>
    </div>
  )
}

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
      sort: 2,
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
      const item1 = a[Object.keys(a)[sort + 1]]
      const item2 = b[Object.keys(b)[sort + 1]]
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
        {graph && <Graph data={data} height={'230px'} />}
      </div>
    )
  }
}

export default List