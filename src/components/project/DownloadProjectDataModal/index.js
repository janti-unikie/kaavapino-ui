import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { DOWNLOAD_PROJECT_DATA_FORM } from '../../../constants'
import FormField from '../../input/FormField'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { phasesSelector } from '../../../selectors/phaseSelector'
import { Button, Modal, Form } from 'semantic-ui-react'
import { getProjectSnapshot, resetProjectSnapshot } from '../../../actions/projectActions'
import { getFormValues } from 'redux-form'
import { currentProjectSelector } from '../../../selectors/projectSelector'
import moment from 'moment'
import { CSVLink } from 'react-csv'

import './styles.scss'

class DownloadProjectDataModal extends Component {
  getFormField = fieldProps => {
    return <FormField {...fieldProps} onChange={this.onChange} />
  }

  onChange = () => {
    const { resetProjectSnapshot } = this.props
    resetProjectSnapshot()
  }

  handleClose = () => {
    const { reset, handleClose, resetProjectSnapshot } = this.props
    reset()
    resetProjectSnapshot()
    handleClose()
  }
  getPhases = () => {
    const currentProject = this.props.currentProject
    const phases = this.props.phases

    const phaseList = []

    phases.forEach(phase => {
      if (phase.project_subtype === currentProject.subtype) {
        phaseList.push({
          label: phase.name,
          value: phase.id,
          text: phase.name
        })
      }
    })
    return phaseList
  }
  loadClicked = async () => {
    const { currentProject, getProjectSnapshot, formValues } = this.props

    const phase = formValues['phase']
    const date = formValues['date']

    await getProjectSnapshot(currentProject.id, moment(date).format(), phase)
  }
  getPhaseFileName = phaseId => {
    const { phases } = this.props
    let phaseFileName
    phases.forEach(phase => {
      if (phase.id === phaseId) {
        phaseFileName = phase.name
      }
    })
    return phaseFileName
  }

  render() {
    const { currentProject, formValues } = this.props
    const phaseId = formValues && formValues['phase']
    const date = formValues && formValues['date']

    const phaseFileName = this.getPhaseFileName(phaseId)

    const fileName = phaseFileName
      ? `${currentProject.name}_${phaseFileName}.csv`
      : date
      ? `${currentProject.name}_${moment(date).format('YYYYMMDD_HHmmSS')}.csv`
      : null

    return (
      <Modal
        className="form-modal"
        size={'tiny'}
        onClose={this.handleClose}
        open={this.props.open}
        closeIcon
      >
        <Modal.Header>Tulosta projektin tiedot</Modal.Header>
        <Modal.Content>
          Valitse toinen seuraavista:
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
                  type: 'datetime',
                  placeHolder: 'Päivämäärä'
                }
              })}
            </Form.Group>
          </Form>
          <Button primary onClick={this.loadClicked}>
            Lataa projektin tiedot
          </Button>
          <div className="download-csv">
            {currentProject.projectSnapshot && fileName && (
              <div>
                Tiedot ladattu. Paina oheista linkkiä lataaksesi .csv tiedoston
                <div>
                  <CSVLink
                    data={[currentProject.projectSnapshot.attribute_data]}
                    separator=";"
                    filename={fileName}
                  >
                    Lataa csv ({fileName})
                  </CSVLink>
                </div>
              </div>
            )}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.handleClose}>
            Sulje
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
    phases: phasesSelector(state),
    currentProject: currentProjectSelector(state),
    formValues: getFormValues(DOWNLOAD_PROJECT_DATA_FORM)(state)
  }
}
const mapDispatchToProps = {
  getProjectSnapshot,
  resetProjectSnapshot
}

const decoratedForm = reduxForm({
  form: DOWNLOAD_PROJECT_DATA_FORM,
  initialValues: {}
})(DownloadProjectDataModal)

export default connect(mapStateToProps, mapDispatchToProps)(decoratedForm)
