import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors, getFormValues } from 'redux-form'
import projectUtils from '../../utils/projectUtils'
import './NewProjectFormModal.scss'
import { connect } from 'react-redux'
import { NEW_PROJECT_FORM } from '../../constants'
import { newProjectSubtypeSelector } from '../../selectors/formSelector'
import FormField from '../input/FormField'

class NewProjectFormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
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
    console.log(errors)
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }

  getFormField = fieldProps => {
    const { formSubmitErrors } = this.props
    const error =
      formSubmitErrors &&
      fieldProps &&
      fieldProps.field &&
      formSubmitErrors[fieldProps.field.name]
    return <FormField {...fieldProps} error={error} />
  }

  render() {
    const { loading } = this.state
    const { currentProject, selectedSubType, initialValues, formValues } = this.props
    const showXLProjectOptions = selectedSubType === 5
    const isEdit = !!currentProject

    return (
      <Modal
        className="form-modal"
        size={'small'}
        onClose={this.props.handleClose}
        open={this.props.open}
        closeIcon
      >
        <Modal.Header>Luo uusi projekti</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              {this.getFormField({
                field: {
                  name: 'name',
                  label: 'Projektin nimi',
                  type: 'text'
                }
              })}
              {this.getFormField({
                className: 'ui fluid input',
                field: {
                  name: 'user',
                  label: 'Vastuuhenkilö',
                  type: 'select',
                  choices: this.formatUsers()
                }
              })}
            </Form.Group>
            {this.getFormField({
              field: {
                name: 'public',
                label: 'Luodaanko projekti julkiseksi',
                type: 'boolean'
              },
              double: true
            })}
            {formValues && formValues.public && !initialValues.public &&
              <div className="warning-box">Huom. Aiemmin ei-näkyväksi merkityn projektin tiedot muuttuvat näkyviksi kaikille Kaavapinon käyttäjille.</div>
            }
            <div className="subtype-input-container">
              {this.getFormField({
                field: {
                  name: 'subtype',
                  label: 'Valitse prosessin koko',
                  type: 'radio',
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
            {formValues && initialValues.subtype && formValues.subtype !== initialValues.subtype &&
              <div className="warning-box">Huom. Kun prosessi vaihtuu, vain ne Kaavapinoon syötetyt tiedot jäävät näkyviin, jotka kuuluvat valittuun prosessiin.</div>
            }
            {showXLProjectOptions && (
              <>
                <h3>Valitse, laaditaanko</h3>
                {this.getFormField({
                  field: {
                    name: 'create_principles',
                    label: 'Suunnitteluperiaatteet',
                    type: 'toggle'
                  }
                })}
                {this.getFormField({
                  field: { name: 'create_draft', label: 'Kaavaluonnos', type: 'toggle' }
                })}
              </>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary disabled={loading} onClick={this.handleClose}>
            Peruuta
          </Button>
          <Button primary disabled={loading} type="submit" onClick={this.handleSubmit}>
            {isEdit ? 'Tallenna' : 'Luo projekti'}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

NewProjectFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
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
