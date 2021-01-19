import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { DOWNLOAD_PROJECT_DATA_FORM } from '../../../constants'
import FormField from '../../input/FormField'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { phasesSelector } from '../../../selectors/phaseSelector'
import { Button, Modal, Form } from 'semantic-ui-react'

import './styles.scss'

class DownloadProjectDataModal extends Component {

  getFormField = ( fieldProps )  => {
    return <FormField {...fieldProps}  />
  }
  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
  }
  getPhases = () => {
    const currentProject = this.props.currentProject
    const phases = this.props.phases

    const phaseList = []

    phases.forEach( phase => {
      if ( phase.project_subtype === currentProject.subtype) {
        phaseList.push( {
          label:  phase.name,
          value: phase.id,
          text: phase.name
        })
      }
    })
    console.log( phaseList )
    return phaseList

  }

  render() {

    console.log(this.props.phases)
    return (
    <Modal
      className="form-modal"
      size={'tiny'}
      onClose={this.props.handleClose}
      open={this.props.open}
      closeIcon
    >
       <Modal.Header>Tulosta projektin tiedot</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              {this.getFormField({
                field: {
                  name: 'phase',
                  label: 'Vaiheet',
                  type: 'select',
                  choices: this.getPhases()
                }
              })}
              {this.getFormField({
                className: 'ui fluid input',
                field: {
                  name: 'date',
                  label: 'Päivämäärä',
                  type: 'datetime'
                }
              })}
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.handleClose}>
            Peruuta
          </Button>
          <Button
            primary
            type="submit"
            onClick={this.props.handleSubmit}
          >
            Lataa
          </Button>
        </Modal.Actions>

    </Modal>
    )
  }
}

DownloadProjectDataModal.propTypes = {
  open: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    phases: phasesSelector(state)
  }
}

const decoratedForm = reduxForm({
  form: DOWNLOAD_PROJECT_DATA_FORM,
  initialValues: {}
})(DownloadProjectDataModal)

export default connect(mapStateToProps, () => ({}))(decoratedForm)
