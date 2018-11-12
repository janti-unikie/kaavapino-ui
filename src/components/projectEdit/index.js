import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { saveProject, changeProjectPhase, validateProjectFields } from '../../actions/projectActions'
import { fetchSchemas } from '../../actions/schemaActions'
import { savingSelector, changingPhaseSelector, validatingSelector, hasErrorsSelector } from '../../selectors/projectSelector'
import { schemaSelector } from '../../selectors/schemaSelector'
import EditForm from './EditForm'
import QuickNav from './QuickNav'

class ProjectEditPage extends Component {
  state = {
    checking: false
  }

  componentDidMount() {
    const { project } = this.props
    this.props.fetchSchemas(project.type)
  }

  changePhase = () => this.props.changeProjectPhase(this.props.project.phase + 1)

  handleSave = () => {
    this.props.saveProject()
    this.setState({ checking: false })
  }

  setChecking = (value) => this.setState({ checking: value })

  render() {
    const {
      schema,
      selectedPhase,
      saveProject,
      project: { name, attribute_data, phase },
      saving,
      changingPhase,
      validateProjectFields,
      validating,
      hasErrors
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
          phase={phase}
          checking={this.state.checking}
          setChecking={this.setChecking}
          validateProjectFields={validateProjectFields}
          validating={validating}
          hasErrors={hasErrors}
        />
        <div className='project-input-right'>
          <QuickNav
            handleSave={this.handleSave}
            handleCheck={() => this.setState(({ checking }) => ({ checking: !checking }))}
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
    changingPhase: changingPhaseSelector(state),
    validating: validatingSelector(state),
    hasErrors: hasErrorsSelector(state)
  }
}

const mapDispatchToProps = {
  fetchSchemas,
  saveProject,
  changeProjectPhase,
  validateProjectFields
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectEditPage)
