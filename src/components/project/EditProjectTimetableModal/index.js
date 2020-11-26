/* This file includes inmplementation of editing floor area, but currently only with mock data */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { EDIT_PROJECT_TIMETABLE_FORM } from '../../../constants'
import FormField from '../../input/FormField'
import Collapse from '../../common/collapse'
import './styles.scss'
import { deadlineSectionsSelector } from '../../../selectors/schemaSelector'
// import { deadlines } from '../timetableEditMockData'

class EditProjectTimeTableModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
    const { initialize, attributeData } = this.props
    initialize(attributeData)
  }

  componentDidMount() {
    const { initialize, attributeData } = this.props
    initialize(attributeData)
  }

 componentDidUpdate(prevProps) {
    const {
      saving,
      initialize,
      attributeData,
      submitSucceeded,
      submitFailed,
      loading
    } = this.props

    function setLoadingFalse() {
      this.setState({ loading: false })
    }

    /* handle submit success / failure */

    if (prevProps.submitting && submitSucceeded) {
      this.handleClose()
    } else if (prevProps.submitting && submitFailed && !submitSucceeded && loading) {
      setLoadingFalse()
    }
    if (prevProps.saving && !saving) {
      initialize(attributeData)
    }
  }

  handleSubmit = () => {
    /* The designs do not have a save-button.
     * Thus we need to clarify: 1) do we save this with the rest of the edit form, and if so,
     * 2) how do we show errors? */

    this.setState({ loading: true })

    const { handleSubmit } = this.props

    const errors = handleSubmit()
    console.log(errors)
  }

  handleClose = () => {
    const { reset, handleClose } = this.props
    reset()
    handleClose()
    this.setState({ loading: false })
  }

  getFormField(fieldProps, key) {
    const { formSubmitErrors, formValues } = this.props
    const error =
      formSubmitErrors && fieldProps.field && formSubmitErrors[fieldProps.field.name]

    return (
      <div key={key}>
        <FormField
          {...fieldProps}
          formName={EDIT_PROJECT_TIMETABLE_FORM}
          attributeData={{}}
          error={error}
          formValues={formValues}
          className="modal-field"
       //   defaultValue={startDate}
    //      currentProject={currentProject}
          isProjectTimetableEdit={true}
        />
      </div>
    )
  }
  getFormFields = (sections, sectionIndex) => {
    const formFields = []
    sections.forEach((subsection) => {
      subsection.attributes.forEach(( field, fieldIndex ) => {
          formFields.push( this.getFormField( { field }, `${sectionIndex} - ${fieldIndex}` ))
        })
    }
    )
    return formFields
  }

  renderSection = (section, sectionIndex) => {
    const sections = section.sections
    return (
      <Collapse title={section.title} key={sectionIndex}>
        {this.getFormFields(sections, sectionIndex)}
      </Collapse>
    )
  }

  render() {
    const { loading } = this.state
    const { open, formValues } = this.props
    const { deadlineSections } = this.props

    if ( !formValues ) {
      return null
    }

    return (
      <Modal
        className="form-modal edit-project-timetable-form-modal"
        size="small"
        onClose={this.handleClose}
        open={open}
        closeIcon
      >
        <Modal.Header>Päivitä aikataulut</Modal.Header>
        <Modal.Content>
          <Form>
            {deadlineSections.map((section, sectionIndex) =>
                this.renderSection(section, sectionIndex)
              )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary disabled={loading} onClick={this.handleClose}>
            Peruuta
          </Button>
          <Button
            primary
            disabled={loading}
            loading={loading}
            type="submit"
            onClick={this.handleSubmit}
          >
            Tallenna
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

EditProjectTimeTableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  formSubmitErrors: getFormSubmitErrors(EDIT_PROJECT_TIMETABLE_FORM)(state),
  deadlineSections: deadlineSectionsSelector(state),
  formValues: getFormValues(EDIT_PROJECT_TIMETABLE_FORM)(state)
})

const decoratedForm = reduxForm({
  form: EDIT_PROJECT_TIMETABLE_FORM
})(EditProjectTimeTableModal)

export default connect(mapStateToProps, () => ({}))(decoratedForm)
