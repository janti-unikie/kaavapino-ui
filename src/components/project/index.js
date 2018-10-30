import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentProject } from '../../actions/projectActions'
import { fetchPhases } from '../../actions/phaseActions'
import { currentProjectSelector } from '../../selectors/projectSelector'
import { phasesSelector } from '../../selectors/phaseSelector'
import { NavHeader } from '../common/NavHeader'
import Timeline from './Timeline'
import ProjectEditPage from '../projectEdit'

const routeItems = [
  { value: 'Kaavahankkeet', path: '/' },
  { value: 'Hankekortti', path: '/' },
  { value: 'Muokkaa', path: '/' }
]

class ProjectPage extends Component {
  componentDidMount() {
    this.props.fetchPhases()
    this.props.setCurrentProject(this.props.id)
  }

  render() {
    const { edit, currentProject, phases } = this.props
    if (!currentProject || !phases) {
      return <div />
    }
    return (
      <div>
        <NavHeader
          routeItems={routeItems}
          title='Muokkaa'
        />
        <Timeline
          phase={currentProject.phase}
          items={phases}
          type={currentProject.type}
        />
        <div className='project-container'>
          { edit && <ProjectEditPage /> }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setCurrentProject,
  fetchPhases
}

const mapStateToProps = (state) => {
  return {
    currentProject: currentProjectSelector(state),
    phases: phasesSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage)