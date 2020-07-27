import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Message } from 'semantic-ui-react'
import FormSection from './FormSection'
import Button from '../common/Button'
import ConfirmModal from './ConfirmModal'

class EditForm extends Component {
  state = {
    endPhaseError: false,
    verifying: false
  }

  componentDidMount() {
    const { initialize, attributeData } = this.props
    initialize(attributeData)
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
      sections,
      title
      // saving,
      // isCurrentPhase,
      // isLastPhase,
      // changingPhase,
      // validating
    } = this.props

    return (
      <Form className="form-container" autoComplete="off">
        <h2>{title}</h2>
        <div className="edit-form-buttons">
          <Button
            value="Päivitä aikataulu"
            secondary
            help="feature not implemented yet"
            fluid
          />
          <Button
            value="Päivitä kerrosalatiedot"
            secondary
            help="feature not implemented yet"
            fluid
          />
        </div>
        {sections.map((section, i) => (
          <FormSection key={i} section={section} />
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
  form: 'editForm',
  enableReinitialize: true
})(EditForm)
