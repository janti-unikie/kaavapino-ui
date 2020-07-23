import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  increaseAmountOfProjectsToShow,
  sortProjects,
  setAmountOfProjectsToIncrease
} from '../../actions/projectActions'
import { phasesSelector } from '../../selectors/phaseSelector'
import {
  loadingProjectsSelector,
  pollingProjectsSelector,
  amountOfProjectsToIncreaseSelector
} from '../../selectors/projectSelector'
import { Loader, Button, Dropdown } from 'semantic-ui-react'
import ListHeader from './ListHeader'
import ListItem from './ListItem'
import Graph from '../common/Graph'
import projectUtils from '../../utils/projectUtils'

class List extends Component {
  constructor(props) {
    super(props)

    this.dropdownOptions = [
      { key: 10, value: 10, text: '10' },
      { key: 25, value: 25, text: '25' },
      { key: 50, value: 50, text: '50' },
      { key: 100, value: 100, text: '100' }
    ]

    this.state = {
      filter: '',
      sort: 5,
      dir: 1
    }
  }

  setSort = type => {
    const { sort, dir } = this.state
    let newSort = sort,
      newDir = dir
    if (type === sort) {
      if (dir === 0) {
        newDir = 1
      } else {
        newDir = 0
      }
    } else {
      newSort = type
      newDir = 0
    }

    this.props.sortProjects({ sort: newSort, dir: newDir })
    this.setState({ sort: newSort, dir: newDir })
  }

  setFilter = value => this.setState({ filter: value })

  selectAmount = (_, { value }) => this.props.setAmountOfProjectsToIncrease(value)

  filterItems = items => {
    const { filter } = this.state
    const filtered = items.filter(item => {
      const filterFields = projectUtils.formatFilterProject(
        item,
        false,
        this.props.phases,
        this.props.users
      )
      let includes = false
      Object.keys(filterFields).forEach(key => {
        const fieldValue = filterFields[key]
        if (!fieldValue) {
          return
        }
        if (
          String(fieldValue)
            .trim()
            .toLowerCase()
            .indexOf(filter.trim().toLowerCase()) > -1
        ) {
          includes = true
        }
      })
      return includes
    })
    return filtered
  }

  render() {
    const { sort, dir } = this.state
    const {
      increaseAmountOfProjectsToShow,
      loadingProjects,
      phases,
      projectSubtypes,
      users,
      pollingProjects,
      total,
      amountOfProjectsToIncrease
    } = this.props
    if (loadingProjects || !phases) {
      return (
        <div className="project-list">
          <Loader inline={'centered'} active>
            Ladataan
          </Loader>
        </div>
      )
    }
    const items = this.filterItems(this.props.items)
    const graphData = items.map(i => projectUtils.formatDeadlines(i, phases)).slice(0, 4)
    const headerItems = [
      'Hankenumero',
      'Nimi',
      'Vaihe',
      'Seuraava määräaika',
      'Koko',
      'Muokattu',
      'Vastuuhenkilö'
    ]
    return (
      <div className="project-list">
        <ListHeader
          items={headerItems}
          selected={sort}
          dir={dir}
          filter={this.setFilter}
          sort={this.setSort}
        />
        {items.map(
          (
            { attribute_data, name, id, modified_at, user, subtype, phase, deadlines },
            i
          ) => {
            const listItem = {
              ...projectUtils.formatPhase(phase, phases),
              name,
              id,
              modified_at: projectUtils.formatDate(modified_at),
              nextDeadline: projectUtils.formatNextDeadline(deadlines, phase),
              user: projectUtils.formatUsersName(users.find(u => u.id === user)),
              subtype: projectUtils.formatSubtype(subtype, projectSubtypes),
              projectId: attribute_data['hankenumero'] || '-'
            }
            return <ListItem key={i} item={listItem} />
          }
        )}
        {items.length === 0 && <span className="empty-list-info">Ei hankkeita!</span>}
        <span className="list-amount">
          Näytetään {items.length}/{total}
        </span>
        {items.length !== 0 && (
          <Graph data={graphData} height={Math.max(graphData.length * 65, 2 * 65)} />
        )}
        <div className="list-actions-container">
          <Button
            loading={pollingProjects}
            disabled={pollingProjects}
            onClick={() => increaseAmountOfProjectsToShow()}
            content="Lataa lisää"
          />
          <div className="list-action-dropdown">
            <span>Latausmäärä: </span>
            <Dropdown
              options={this.dropdownOptions}
              value={amountOfProjectsToIncrease}
              onChange={this.selectAmount}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  increaseAmountOfProjectsToShow,
  sortProjects,
  setAmountOfProjectsToIncrease
}

const mapStateToProps = state => ({
  phases: phasesSelector(state),
  loadingProjects: loadingProjectsSelector(state),
  pollingProjects: pollingProjectsSelector(state),
  amountOfProjectsToIncrease: amountOfProjectsToIncreaseSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
