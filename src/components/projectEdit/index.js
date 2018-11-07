import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { saveProject, changeProjectPhase } from '../../actions/projectActions'
import { fetchSchemas } from '../../actions/schemaActions'
import { savingSelector, changingPhaseSelector } from '../../selectors/projectSelector'
import { schemaSelector } from '../../selectors/schemaSelector'
import EditForm from './EditForm'
import QuickNav from './QuickNav'

class ProjectEditPage extends Component {
  componentDidMount() {
    const { project } = this.props
    this.props.fetchSchemas(project.type)
  }

  changePhase = () => this.props.changeProjectPhase(this.props.project.phase + 1)

  render() {
    const {
      project: { name },
      schema,
      selectedPhase,
      saveProject,
      project: { attribute_data, phase },
      saving,
      changingPhase
    } = this.props
    if (!schema) {
      return <Loader inline={'centered'} active>Ladataan</Loader>
    }
    const currentSchema = schema.phases[selectedPhase - 1]
    return (
      <div className='project-input-container'>
        <EditForm
          isCurrentPhase={ selectedPhase === phase }
          handleSave={saveProject}
          changePhase={this.changePhase}
          sections={currentSchema.sections}
          attributeData={attribute_data}
          saving={saving}
          changingPhase={changingPhase}
        />
        <div className='project-input-right'>
          <QuickNav
            handleSave={saveProject}
            projectName={ name }
            sections={ currentSchema.sections }
            phaseTitle={ currentSchema.title }
            saving={saving}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schema: schemaSelector(state),
    saving: savingSelector(state),
    changingPhase: changingPhaseSelector(state)
  }
}

const mapDispatchToProps = {
  fetchSchemas,
  saveProject,
  changeProjectPhase
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectEditPage)
