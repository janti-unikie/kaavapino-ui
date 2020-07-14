import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { isDirty } from 'redux-form/immutable'
import { saveProject, changeProjectPhase, validateProjectFields, projectSetChecking } from '../../actions/projectActions'
import { fetchSchemas } from '../../actions/schemaActions'
import { savingSelector, changingPhaseSelector, validatingSelector, hasErrorsSelector, checkingSelector } from '../../selectors/projectSelector'
import { schemaSelector } from '../../selectors/schemaSelector'
import NavigationPrompt from 'react-router-navigation-prompt'
import Prompt from '../common/Prompt'
import EditForm from './EditForm'
import QuickNav from './QuickNav'
import Shoutbox from '../shoutbox'

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
    const currentSchemaIndex = schema.phases.findIndex((s) => s.id === selectedPhase)
    const currentSchema = schema.phases[currentSchemaIndex]

    if (currentSchemaIndex === -1) {
      return <Loader inline={'centered'} active>Ladataan</Loader>
    }
    return (
      <div className='project-input-container'>
        <Shoutbox project={id} />
        <div className='project-input-left'>
          <QuickNav
            handleSave={this.handleSave}
            handleCheck={() => this.props.projectSetChecking(!this.props.checking)}
            projectName={ name }
            sections={ currentSchema.sections }
            phaseTitle={ currentSchema.title }
            saving={saving}
          />
          <NavigationPrompt when={this.props.isDirty}>
            {({ onConfirm, onCancel }) => (
              <Prompt
                onCancel={onCancel}
                onConfirm={onConfirm}
                message='Hankkeessa on tallentamattomia muutoksia. Haluatteko silti jatkaa?'
              />
            )}
          </NavigationPrompt>
        </div>
        <EditForm
          isCurrentPhase={selectedPhase === phase}
          isLastPhase={phase === schema.phases[schema.phases.length - 1].id}
          handleSave={saveProject}
          changePhase={this.changePhase}
          sections={currentSchema.sections}
          attributeData={attribute_data}
          saving={saving}
          changingPhase={changingPhase}
          phase={phase}
          selectedPhase={selectedPhase}
          setChecking={this.props.projectSetChecking}
          validateProjectFields={validateProjectFields}
          validating={validating}
          hasErrors={hasErrors}
          title={`${currentSchemaIndex + 1}. ${currentSchema.title}`}
        />
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
    checking: checkingSelector(state),
    isDirty: isDirty('editForm')(state)
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
