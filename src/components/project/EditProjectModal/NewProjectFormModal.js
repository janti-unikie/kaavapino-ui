import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors, getFormValues } from 'redux-form'
import projectUtils from '../../../utils/projectUtils'
import './NewProjectFormModal.scss'
import { connect } from 'react-redux'
import { NEW_PROJECT_FORM } from '../../../constants'
import { newProjectSubtypeSelector } from '../../../selectors/formSelector'
import FormField from '../../input/FormField'
import { Button } from 'hds-react'

const PROJECT_NAME = 'name'
const USER = 'user'
const PUBLIC = 'public'
const SUB_TYPE = 'subtype'
const CREATE_PRINCIPLES = 'create_principles'
const CREATE_DRAFT = 'create_draft'

class NewProjectFormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    const { initialize, currentProject } = this.props

    if (!currentProject) {
      return
    }
    initialize({
      onhold: currentProject.onhold,
      public: currentProject.public,
      user: currentProject.user,
      subtype: currentProject.subtype,
      create_draft: currentProject.create_draft,
      create_principles: currentProject.create_principles,
      name: currentProject.name
    })
  }

  componentDidUpdate(prevProps) {
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
  }

  formatUsers = () => {
    return this.props.users.map(user => {
      return {
        value: user.id,
        label: projectUtils.formatUsersName(user)
      }
    })
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    const errors = this.props.handleSubmit()
    if ( errors ) {
      console.log(errors)
    }
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }
  getError = (error, fieldName) => {
    // In case that there are field related errors, show errors.
    // Required field error is handled differently
    if (error) {
      if (fieldName === USER) {
        return error.user
      }
    }
    return error
  }

  getFormField = fieldProps => {
    const { formSubmitErrors, formValues } = this.props

    const error =
      formSubmitErrors &&
      fieldProps &&
      fieldProps.field &&
      formSubmitErrors[fieldProps.field.name]

    return (
      <FormField
        {...fieldProps}
        error={this.getError(error, fieldProps.field.name)}
        formValues={formValues}
      />
    )
  }

  render() {
    const { loading } = this.state
    const { currentProject, selectedSubType, initialValues, formValues } = this.props
    const showXLProjectOptions = selectedSubType === 5
    const isEdit = !!currentProject

    const isValidXLProject =
      formValues && (formValues.create_principles || formValues.create_draft)

    const hideSaveButton = () => {
      if (!formValues) {
        return true
      }
      if (formValues.name && formValues.user && formValues.subtype) {
        if (selectedSubType === 5) {
          return !isValidXLProject
        }
        return false
      }
      return true
    }

    const hideSave = hideSaveButton()

    return (
      <Modal
        className="form-modal project-edit"
        size={'small'}
        onClose={this.props.handleClose}
        open={this.props.modalOpen}
        closeIcon
      >
        <Modal.Header>
          {isEdit ? 'Muokkaa luontitietoja' : 'Luo uusi projekti'}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              {this.getFormField({
                field: {
                  name: PROJECT_NAME,
                  label: 'Projektin nimi',
                  type: 'text',
                  editable: true
                }
              })}
              {this.getFormField({
                className: 'ui fluid input user-selection',
                field: {
                  name: USER,
                  label: 'Vastuuhenkilö',
                  type: 'select',
                  choices: this.formatUsers(),
                  editable: true
                }
              })}
            </Form.Group>
            {this.getFormField({
              field: {
                name: PUBLIC,
                label: 'Luodaanko projekti näkyväksi',
                type: 'boolean',
                editable: true
              },
              double: true
            })}
            {formValues && formValues.public && !initialValues.public && (
              <div className="warning-box">
                Huom. Aiemmin ei-näkyväksi merkityn projektin tiedot muuttuvat näkyviksi
                kaikille Kaavapinon käyttäjille.
              </div>
            )}
            <div className="subtype-input-container">
              {this.getFormField({
                field: {
                  name: SUB_TYPE,
                  label: 'Valitse prosessin koko',
                  type: 'radio',
                  editable: true,
                  options: [
                    { value: 1, label: 'XS' },
                    { value: 2, label: 'S' },
                    { value: 3, label: 'M' },
                    { value: 4, label: 'L' },
                    { value: 5, label: 'XL' }
                  ]
                }
              })}
            </div>
            {formValues &&
              initialValues.subtype &&
              formValues.subtype !== initialValues.subtype && (
                <div className="warning-box">
                  Huom. Kun prosessi vaihtuu, vain ne Kaavapinoon syötetyt tiedot jäävät
                  näkyviin, jotka kuuluvat valittuun prosessiin.
                </div>
              )}
            {showXLProjectOptions && (
              <>
                <h4>Valitse, laaditaanko</h4>
                {this.getFormField({
                  field: {
                    name: CREATE_PRINCIPLES,
                    label: 'Periaatteet',
                    type: 'toggle'
                  }
                })}
                {this.getFormField({
                  field: { name: CREATE_DRAFT, label: 'Kaavaluonnos', type: 'toggle' }
                })}
              </>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <div className="form-buttons">
            <Button variant="secondary" disabled={loading} onClick={this.handleClose}>
              Peruuta
            </Button>
            <Button
              variant="primary"
              disabled={loading ? true : false || hideSave}
              loading={loading.toString()}
              type="submit"
              onClick={this.handleSubmit}
            >
              {isEdit ? 'Tallenna' : 'Luo projekti'}
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    )
  }
}

NewProjectFormModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  selectedSubType: newProjectSubtypeSelector(state),
  formSubmitErrors: getFormSubmitErrors(NEW_PROJECT_FORM)(state),
  formValues: getFormValues(NEW_PROJECT_FORM)(state)
})

const decoratedForm = reduxForm({
  form: NEW_PROJECT_FORM,
  initialValues: { public: true }
})(NewProjectFormModal)

export default connect(mapStateToProps, () => ({}))(decoratedForm)
