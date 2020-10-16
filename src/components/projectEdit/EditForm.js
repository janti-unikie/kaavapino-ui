import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { Message } from 'semantic-ui-react'
import FormSection from './FormSection'
import Button from '../common/Button'
import ConfirmModal from './ConfirmModal'
import { EDIT_PROJECT_FORM } from '../../constants'
import Shoutbox from '../shoutbox'

class EditForm extends Component {
  state = {
    endPhaseError: false,
    verifying: false
  }

  componentDidMount() {
    this.autoSave = setInterval(() => this.props.handleSave(), 180000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    clearInterval(this.autoSave)
  }

  componentDidUpdate(prevProps) {
    const { setChecking, hasErrors, saving, initialize, attributeData } = this.props

    if (prevProps.validating && !this.props.validating) {
      /* Beginning validation is started in quicknav. */
      if (!hasErrors) {
        this.setState({ verifying: true, endPhaseError: false })
        setChecking(false)
      } else {
        this.setState({ endPhaseError: true })
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.setState({ endPhaseError: false }), 5000)
        setChecking(true)
      }
    }

    if (prevProps.saving && !saving) {
      initialize(attributeData)
    }
  }

  phaseCallback = changePhase => {
    if (changePhase) {
      this.props.changePhase()
    }
    this.setState({ verifying: false })
  }

  changePhase = () => this.props.validateProjectFields()

  render() {
    const {
      disabled,
      sections,
      title,
      // saving,
      // isCurrentPhase,
      // isLastPhase,
      // changingPhase,
      projectId,
      showEditFloorAreaForm,
      attributeData,
      syncronousErrors
    } = this.props

    return (
      <Form className="form-container" autoComplete="off">
        <h2 id="accordion-title">{title}</h2>
        <div className="edit-form-buttons">
          <Button
            value="Päivitä aikataulu"
            secondary
            help="feature not implemented yet"
          />
          <Button
            value="Päivitä kerrosalatiedot"
            secondary
            onClick={showEditFloorAreaForm}
          />
          <Shoutbox project={projectId} />
        </div>
        {sections.map((section, i) => (
          <FormSection
            syncronousErrors={syncronousErrors}
            formName={EDIT_PROJECT_FORM}
            key={i} handleSave={this.props.handleSave}
            section={section}
            disabled={disabled}
            attributeData={attributeData}

            />
        ))}
        {/* Commenting end phase and save buttons out, since in these designs it's in quick nav.
         * Keeping it here in case it's needed in mobile styles. if not, remove.
        <Button
          handleClick={this.props.handleSave}
          value="Tallenna"
          icon={<FontAwesomeIcon icon="check" />}
          loading={saving}
          secondary
          help="Tallentaa hankkeen"
        />
        {isCurrentPhase && !isLastPhase && (
          <Button
            handleClick={this.changePhase}
            value="Lopeta vaihe"
            icon={<FontAwesomeIcon icon="forward" />}
            loading={changingPhase || validating}
            secondary
            help="Yrittää lopettaa tämänhetkisen vaiheen"
          />
        )}
        */}
        <ConfirmModal callback={this.phaseCallback} open={this.state.verifying} />
        {this.state.endPhaseError && (
          <Message
            header="Vaihetta ei voida vielä lopettaa"
            content="Täytä puuttuvat kentät"
            color="yellow"
          />
        )}

        <div
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div>Sivun alkuun</div>
          <div className="arrow-up-icon" />
        </div>
      </Form>
    )
  }
}

export default reduxForm({
  form: EDIT_PROJECT_FORM,
  enableReinitialize: true
})(EditForm)
