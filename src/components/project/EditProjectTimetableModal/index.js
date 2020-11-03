/* This file includes inmplementation of editing floor area, but currently only with mock data */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import {  EDIT_PROJECT_TIMETABLE_FORM } from '../../../constants'
import FormField from '../../input/FormField'
import Collapse from '../../common/collapse'
import './styles.scss'
//import { floorAreaSectionsSelector } from '../../../selectors/schemaSelector'
import projectTimetableEditSectionsMock from '../timetableEditMockData'

class EditTimeTableModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const { initialize, attributeData } = this.props
    initialize(attributeData)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    clearInterval(this.autoSave)
  }

  componentDidUpdate(prevProps) {
    const { saving, initialize, attributeData } = this.props

    /* handle submit success / failure */

    if (prevProps.submitting && this.props.submitSucceeded) {
      this.handleClose()
    } else if (
      prevProps.submitting &&
      this.props.submitFailed &&
      !this.props.submitSucceeded &&
      this.state.loading
    ) {
      this.setState({ loading: false })
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

    const errors = this.props.handleSubmit()
    console.log(errors)
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }
  getFormField = (fieldProps, key) => {
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
          className='modal-field'
          isProjectTimetableEdit={true}/>
      </div>
    )
  }
  renderSection = (section, sectionIndex) => {
     return (
        <Collapse title={section.title} key={sectionIndex}>
          {section.fields.map((field, fieldIndex) => (
              this.getFormField({ field }, `${sectionIndex} - ${fieldIndex}`)
            ))
          }
        </Collapse>
      )
    }

  render() {
    const { loading } = this.state
    //const { timetableEditSections } = this.props
    return (
      <Modal
        className="form-modal edit-project-timetable-form-modal"
        size={'small'}
        onClose={this.handleClose}
        open={this.props.open}
        closeIcon
      >
        <Modal.Header>Päivitä aikataulut</Modal.Header>
        <Modal.Content>
          <Form>
            {projectTimetableEditSectionsMock &&
              projectTimetableEditSectionsMock.map((section, sectionIndex) => (
                this.renderSection(section, sectionIndex)
              ))
              }
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

EditTimeTableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  formSubmitErrors: getFormSubmitErrors(EDIT_PROJECT_TIMETABLE_FORM)(state),
 // floorAreaSections: floorAreaSectionsSelector(state),
  formValues: getFormValues(EDIT_PROJECT_TIMETABLE_FORM)(state)
})

const decoratedForm = reduxForm({
  form: EDIT_PROJECT_TIMETABLE_FORM
})(EditTimeTableModal)

export default connect(mapStateToProps, () => ({}))(decoratedForm)
