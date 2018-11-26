import React, { Component } from 'react'
import { connect } from 'react-redux'
import { phasesSelector } from '../../selectors/phaseSelector'
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
      'subtype',
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

  formatUser = (id) => {
    const user = this.props.users.find((user) => user.id === id)
    if (user) {
      return (user.first_name && user.last_name) ? `${user.first_name} ${user.last_name}` : user.email
    }
    return ''
  }

  formatPhase = (id) => {
    const { name, color_code } = this.props.phases.find((phase) => phase.id === id)
    return { phaseName: name, phaseColor: color_code }
  }

  formatSubtype = (id) => this.props.projectSubtypes.find((subtype) => subtype.id === id).name

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
    const user = this.formatUser(item.user)
    const modified_at = projectUtils.formatDate(item.modified_at)
    const phase = this.formatPhase(item.phase).phaseName
    const subtype = item.subtype
    const name = item.name
    return { name, user, modified_at, phase, subtype }
  }

  filterItems = (items) => {
    const { filter } = this.state
    const filtered = items.filter((item) => {
      const filterFields = this.formatFilterItem(item)
      let includes = false
      Object.keys(filterFields).forEach((key) => {
        const fieldValue = filterFields[key]
        if (!fieldValue) {
          return
        }
        if (String(fieldValue).trim().toLowerCase().indexOf(filter.trim().toLowerCase()) > -1) {
          includes = true
        }
      })
      return includes
    })
    return filtered
  }

  render() {
    const { sort, dir } = this.state
    if (!this.props.items || !this.props.phases) {
      return (
        <div className='project-list'>
          <Loader inline={'centered'} active>Ladataan</Loader>
        </div>
      )
    }
    const items = this.sortItems(this.filterItems(this.props.items))
    const headerItems = ['Nimi', 'Vaihe', 'Seuraava määräaika', 'Koko', 'Muokattu', 'Vastuuhenkilö', 'Viimeisin kommentti']
    return (
      <div className='project-list'>
        <ListHeader items={headerItems} selected={sort} dir={dir} filter={this.setFilter} sort={this.setSort} />
        { items.map(({ name, id, modified_at, user, subtype, phase }, i) => {
          const listItem = {
            ...this.formatPhase(phase),
            name,
            id,
            modified_at: projectUtils.formatDate(modified_at),
            user: this.formatUser(user),
            subtype: this.formatSubtype(subtype)
          }
          return (
            <ListItem
              key={i}
              item={listItem}
            />
          )
        })}
        { items.length === 0 && <span className='empty-list-info'>Ei hankkeita!</span> }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  phases: phasesSelector(state)
})

export default connect(
  mapStateToProps
)(List)