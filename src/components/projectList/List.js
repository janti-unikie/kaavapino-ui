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
import { Loader, Button } from 'semantic-ui-react'
import ListHeader from './ListHeader'
import ListItem from './ListItem'
import projectUtils from '../../utils/projectUtils'
import SubList from './ListSubList'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showGraph: false,
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

  toggleGraph = () => {
    this.setState(prevState => ({
      showGraph: !prevState.showGraph
    }))
  }

  render() {
    const { sort, dir, showGraph } = this.state
    const {
      increaseAmountOfProjectsToShow,
      loadingProjects,
      phases,
      projectSubtypes,
      users,
      pollingProjects,
      searchOpen,
      toggleSearch,
      setFilter
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

    const items = this.props.items
    const headerItems = [
      'Pinonumero',
      'Hanke (PW)',
      'Nimi',
      'Vaihe',
      'Koko',
      'Muokattu',
      'Vastuuhenkilö'
    ]
    let abortedProjects = []
    let archivedProjects = []
    let projects = []
    items.map(
      (
        {
          attribute_data,
          name,
          id,
          modified_at,
          user,
          subtype,
          phase,
          onhold,
          archived,
          pino_number
        },
        i
      ) => {
        const listItem = {
          ...projectUtils.formatPhase(phase, phases),
          name,
          id,
          pino_number,
          modified_at: projectUtils.formatDate(modified_at),
          user: projectUtils.formatUsersName(users.find(u => u.id === user)),
          subtype: projectUtils.formatSubtype(subtype, projectSubtypes),
          projectId: attribute_data['hankenumero'] || '-'
        }
        if (onhold) {
          abortedProjects.push(
            <ListItem
              key={i}
              item={listItem}
              showGraph={showGraph}
              phases={phases}
            />
          )
          return false
        } else if (archived) {
          archivedProjects.push(
            <ListItem
              key={i}
              item={listItem}
              showGraph={showGraph}
              phases={phases}
            />
          )
          return false
        } else {
          projects.push(
            <ListItem
              key={i}
              item={listItem}
              showGraph={showGraph}
              phases={phases}
            />
          )
          return false
        }
      }
    )

    return (
      <div className="project-list">
        {items.length > 0 && (
          <ListHeader
            toggleSearch={toggleSearch}
            searchOpen={searchOpen}
            items={headerItems}
            selected={sort}
            dir={dir}
            sort={this.setSort}
            toggleGraph={this.toggleGraph}
            setFilter={setFilter}
          />
        )}

        {projects.length !== 0 && projects}
        {abortedProjects.length !== 0 && (
          <SubList title={'Keskeytyneet projektit'} items={abortedProjects} />
        )}
        {archivedProjects.length !== 0 && (
          <SubList title={'Arkistoidut projektit'} items={archivedProjects} />
        )}

        {items.length === 0 && <span className="empty-list-info">Ei projekteja!</span>}

        {items.length > 0 && (
          <div className="list-actions-container">
            <Button
              loading={pollingProjects}
              disabled={pollingProjects}
              secondary
              onClick={() => increaseAmountOfProjectsToShow()}
              content="Näytä lisää"
            />
          </div>
        )}
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
