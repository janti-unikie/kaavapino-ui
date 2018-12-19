import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { saveProject, changeProjectPhase, validateProjectFields, projectSetChecking } from '../../actions/projectActions'
import { fetchSchemas } from '../../actions/schemaActions'
import { savingSelector, changingPhaseSelector, validatingSelector, hasErrorsSelector, checkingSelector } from '../../selectors/projectSelector'
import { schemaSelector } from '../../selectors/schemaSelector'
import EditForm from './EditForm'
import QuickNav from './QuickNav'
import Comments from '../comments'

class ProjectEditPage extends Component {
  componentDidMount() {
    const { project } = this.props
    this.props.fetchSchemas(project.subtype)
  }

  changePhase = () => this.props.changeProjectPhase(this.props.project.phase + 1)

  handleSave = () => {
    this.props.saveProject()
    this.setState({ checking: false })
  }

  render() {
    const {
      schema,
      selectedPhase,
      saveProject,
      project: { name, attribute_data, phase, id },
      saving,
      changingPhase,
      validateProjectFields,
      validating,
      hasErrors
    } = this.props
    if (!schema) {
      return <Loader inline={'centered'} active>Ladataan</Loader>
    }
    const currentSchema = schema.phases.find((s) => s.id === selectedPhase)
    if (!currentSchema) {
      return <Loader inline={'centered'} active>Ladataan</Loader>
    }
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
          phase={phase}
          setChecking={this.props.projectSetChecking}
          validateProjectFields={validateProjectFields}
          validating={validating}
          hasErrors={hasErrors}
        />
        <div className='project-input-right'>
          <QuickNav
            handleSave={this.handleSave}
            handleCheck={() => this.props.projectSetChecking(!this.props.checking)}
            projectName={ name }
            sections={ currentSchema.sections }
            phaseTitle={ currentSchema.title }
            saving={saving}
          />
          <Comments project={id} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schema: schemaSelector(state),
    saving: savingSelector(state),
    changingPhase: changingPhaseSelector(state),
    validating: validatingSelector(state),
    hasErrors: hasErrorsSelector(state),
    checking: checkingSelector(state)
  }
}

const mapDispatchToProps = {
  fetchSchemas,
  saveProject,
  changeProjectPhase,
  validateProjectFields,
  projectSetChecking
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectEditPage)
