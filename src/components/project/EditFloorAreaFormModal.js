import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors } from 'redux-form'
import { connect } from 'react-redux'
import { EDIT_FLOOR_AREA_FORM } from '../../constants'
import FormField from '../input/FormField'
import Collapse from '../common/collapse'
import floorAreaFormSections from './floorAreaMockData'

class EditFloorAreaFormModal extends Component {
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
    // const { loading } = this.state
    // const { currentProject /* initialValues */ } = this.props

    return (
      <Modal
        className="form-modal edit-floor-area-form-modal"
        size={'small'}
        onClose={this.props.handleClose}
        open={this.props.open}
        closeIcon
      >
        <Modal.Header>Päivitä kerrosalatiedot</Modal.Header>
        <Modal.Content>
          <Form>
            {floorAreaFormSections.map((section, i) => (
              <Collapse title={section.title} key={i}>
                {this.getFormField(section.matrix)}
              </Collapse>
            ))}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

EditFloorAreaFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  formSubmitErrors: getFormSubmitErrors(EDIT_FLOOR_AREA_FORM)(state)
})

const decoratedForm = reduxForm({
  form: EDIT_FLOOR_AREA_FORM
})(EditFloorAreaFormModal)

export default connect(mapStateToProps, () => ({}))(decoratedForm)
