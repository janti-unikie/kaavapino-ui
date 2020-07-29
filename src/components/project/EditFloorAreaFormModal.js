import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form } from 'semantic-ui-react'
import { reduxForm, getFormSubmitErrors } from 'redux-form'
import { connect } from 'react-redux'
import { EDIT_FLOOR_AREA_FORM } from '../../constants'
import FormField from '../input/FormField'
import Collapse from '../common/collapse'

// const sections = [
//   {
//     title: 'Kerrosalan lisäys yhteensä',
//     fields: ['asuminen_yhteensa', 'toimitila_yhteensa', 'kerrosalan_lisays_yhteensa']
//   },
//   {
//     title: 'Julkiset',
//     fields: [
//       'julkiset_uusi_k_m2kunta',
//       'julkiset_uusi_k_m2valtio',
//       'julkiset_uusi_k_m2muut'
//     ]
//   }
// ]

// Asuminen
// asuminen_kerrostalo_uusi_k_m2kunta
// asuminen_kerrostalo_uusi_k_m2valtio
// asuminen_kerrostalo_uusi_k_m2muut
// asuminen_pientalo_uusi_k_m2kunta
// asuminen_pientalo_uusi_k_m2valtio
// asuminen_pientalo_uusi_k_m2muut

// Muut

// muut_uusi_k_m2kunta
// muut_uusi_k_m2valtio
// muut_uusi_k_m2muut
// lisatietoa_kerrosaloista

// Toimitilat

// toimisto_uusi_k_m2kunta
// toimisto_uusi_k_m2valtio
// toimisto_uusi_k_m2muut
// liiketila_uusi_k_m2kunta
// liiketila_uusi_k_m2valtio
// liiketila_uusi_k_m2muut
// teollisuus_uusi_k_m2kunta
// teollisuus_uusi_k_m2valtio
// teollisuus_uusi_k_m2muut
// ]

const testMatrix = {
  field: {
    type: 'matrix',
    matrix: {
      rows: [''],
      columns: ['Kunta', 'Valtio', 'Muut'],
      fields: [
        {
          name: 'julkiset_uusi_k_m2kunta',
          label: 'kunta',
          placeholder: '0',
          type: 'number',
          row: 0,
          column: 0
        },
        {
          name: 'julkiset_uusi_k_m2valtio',
          placeholder: '0',
          label: 'valtio',
          type: 'number',
          row: 0,
          column: 1
        },
        {
          name: 'julkiset_uusi_k_m2muut',
          placeholder: '0',
          label: 'muut',
          type: 'number',
          row: 0,
          column: 2
        }
        // {
        //   name: 'julkiset_yhteensa',
        //   placeholder: '0',
        //   type: 'number',
        //   row: 0,
        //   column: 3
        // }
      ]
    }
  },
  attributeData: {
    '2': '',
    '3': 'c',
    '4': 'd'
  }
}

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
            {/* <Form.Group widths="equal">
              {this.getFormField({
                field: {
                  name: 'name',
                  label: 'Projektin nimi',
                  type: 'text'
                }
              })}
            </Form.Group>
            {this.getFormField({
              field: {
                name: 'public',
                label: 'Luodaanko projekti näkyväksi',
                type: 'boolean'
              },
              double: true
            })} */}
            <Collapse title="Julkiset">{this.getFormField(testMatrix)}</Collapse>
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
