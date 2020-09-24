/* This file includes inmplementation of editing floor area, but currently only with mock data */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors } from 'redux-form'
import { connect } from 'react-redux'
import { EDIT_FLOOR_AREA_FORM } from '../../../constants'
import FormField from '../../input/FormField'
import Collapse from '../../common/collapse'
import './styles.scss'
import { floorAreaSectionsSelector } from '../../../selectors/schemaSelector'

const FloorAreaTotals = ({ formValues, floorAreaSections }) => {
  // Would love a more rubust check than string includes if one becomes available
  const totalSection = floorAreaSections.find(section =>
    section.title.includes('yhteensä')
  )

  return (
    <div className="floor-area-totals">
      <div className="floor-area-totals-header">Kerrosalan lisäys yhteensä</div>
      <div className="totals">
        {totalSection.fields.map((totalMatrix, i) => (
          <FormField
            field={totalMatrix}
            attributeData={formValues}
            key={i}
            formName={EDIT_FLOOR_AREA_FORM}
          />
        ))}
      </div>
    </div>
  )
}
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

  getFloorAreaTotalsComponent = () => {
    const { floorAreaSections } = this.props
    return <FloorAreaTotals formValues={{}} floorAreaSections={floorAreaSections} />
  }

  getFormField = (fieldProps, key) => {
    const { formSubmitErrors } = this.props
    const error =
      formSubmitErrors && fieldProps.field && formSubmitErrors[fieldProps.field.name]

    return (
      <div key={key}>
        <FormField {...fieldProps} formName={EDIT_FLOOR_AREA_FORM} attributeData={{}} error={error}/>
      </div>
    )
  }
  renderSection = (section, sectionIndex) => {

    // "Yhteesä" section is handled separately
    if ( section.title.includes('yhteensä') ) {
      return null
    }
     return (
        <Collapse title={section.title} key={sectionIndex}>
          {section.fields.map((field, fieldIndex) => (
              this.getFormField({ field }, `${sectionIndex} - ${fieldIndex}`)
            ))
          }
        </Collapse> )
    }

  render() {
    const { loading } = this.state
    const { floorAreaSections } = this.props

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
          {this.getFloorAreaTotalsComponent()}
          <Form>
            {floorAreaSections &&
              floorAreaSections.map((section, sectionIndex) => (
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

EditFloorAreaFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  formSubmitErrors: getFormSubmitErrors(EDIT_FLOOR_AREA_FORM)(state),
  floorAreaSections: floorAreaSectionsSelector(state)
})

const decoratedForm = reduxForm({
  form: EDIT_FLOOR_AREA_FORM
})(EditFloorAreaFormModal)

export default connect(mapStateToProps, () => ({}))(decoratedForm)
