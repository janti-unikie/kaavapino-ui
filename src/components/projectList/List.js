import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import ListHeader from './ListHeader'
import ListItem from './ListItem'
import projectUtils from '../../utils/projectUtils'

class List extends Component {
  constructor(props) {
    super(props)

    this.targetAttributes = [
      'name',
      'phase',
      null,
      'type',
      'modified_at',
      'user',
      null
    ]

    this.state = {
      filter: '',
      sort: 2,
      dir: 0
    }
  }

  getUsersName = (id) => {
    const user = this.props.users.find((user) => user.id === id)
    return user ? `${user.first_name} ${user.last_name}` : ''
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
      const item1 = this.formatFilterItem(a)[this.targetAttributes[sort]]
      const item2 = this.formatFilterItem(b)[this.targetAttributes[sort]]

      return dir === 0 ?
        item1 > item2 ? 1 : -1 :
        item1 < item2 ? 1 : -1
    })
  }

  setFilter = (value) => this.setState({ filter: value })

  formatFilterItem = (item) => {
    const user = this.getUsersName(item.user)
    const modified_at = projectUtils.formatDate(item.modified_at)
    const phase = projectUtils.statusToText(item.phase)
    const type = projectUtils.projectSizeToText(item.type)
    const name = item.name
    return { name, user, modified_at, phase, type }
  }

  filterItems = (items) => {
    const { filter } = this.state
    const filtered = items.filter((item) => {
      const filterFields = this.formatFilterItem(item)
      let includes = false
      Object.keys(filterFields).forEach((key) => {
        const fieldValue = String(filterFields[key])
        if (!fieldValue) {
          return
        }
        if (fieldValue.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) > -1) {
          includes = true
        }
      })
      return includes
    })
    return filtered
  }

  render() {
    const { sort, dir } = this.state
    console.log(this.props.items)
    if (!this.props.items) {
      return <Loader active>Ladataan</Loader>
    }
    const items = this.sortItems(this.filterItems(this.props.items))
    const headerItems = ['Nimi', 'Vaihe', 'Seuraava määräaika', 'Koko', 'Muokattu', 'Vastuuhenkilö', 'Viimeisin kommentti']
    return (
      <div className='project-list'>
        <ListHeader items={headerItems} selected={sort} dir={dir} filter={this.setFilter} sort={this.setSort} />
        { items.map((item, i) => <ListItem key={i} item={item} getUsersName={this.getUsersName} />) }
        { items.length === 0 && <span className='empty-list-info'>Ei hankkeita!</span> }
      </div>
    )
  }
}

export default List