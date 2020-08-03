/* This file includes inmplementation of editing floor area, but currently only with mock data */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors } from 'redux-form'
import { connect } from 'react-redux'
import { EDIT_FLOOR_AREA_FORM } from '../../../constants'
import FormField from '../../input/FormField'
import Collapse from '../../common/collapse'
import floorAreaFormSections, {
  mockAttributeData,
  mockFloorAreaTotals
} from '../floorAreaMockData'
import './styles.scss'

const FloorAreaTotals = () => (
  <div className="floor-area-totals">
    <div className="floor-area-totals-header">Kerrosalan lisäys yhteensä</div>
    <div className="totals">
      {mockFloorAreaTotals.map((totalObject, i) => (
        <div className="single-total-container" key={i}>
          <div className="single-total-title">{totalObject.title}</div>
          <div className="single-total-value">
            {totalObject.value} k-m<sup>2</sup>
          </div>
        </div>
      ))}
    </div>
  </div>
)
class EditFloorAreaFormModal extends Component {
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
          <FloorAreaTotals />
          <Form>
            {floorAreaFormSections.map((section, i) => (
              <Collapse title={section.title} key={i}>
                {this.getFormField(section.formField)}
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
  formSubmitErrors: getFormSubmitErrors(EDIT_FLOOR_AREA_FORM)(state),
  attributeData: mockAttributeData
})

const decoratedForm = reduxForm({
  form: EDIT_FLOOR_AREA_FORM
})(EditFloorAreaFormModal)

export default connect(mapStateToProps, () => ({}))(decoratedForm)
