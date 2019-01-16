import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Field from '../input/Field'
import { deadlinesSelector } from '../../selectors/projectSelector'
import { projectSetDeadlines } from '../../actions/projectActions'
import { Button, Modal, Form } from 'semantic-ui-react'
import Input from '../input/Input'
import projectUtils from '../../utils/projectUtils'

class FormModal extends Component {
  state = {
    loading: false
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.initDeadlines()
    }

    if (prevProps.submitting && this.props.submitSucceeded) {
      this.handleClose()
    } else if (prevProps.submitting && this.props.submitFailed && !this.props.submitSucceeded && this.state.loading) {
      this.setState({ loading: false })
    }
  }

  initDeadlines = () => {
    let result = {}
    this.props.deadlines.forEach(({ phase_name, start, deadline }) => {
      result[`${phase_name}-start`] = start.split('Z')[0]
      result[`${phase_name}-deadline`] = deadline.split('Z')[0]
    })
    this.props.initialize(result)
  }

  projectNameInput = (props) => <Input placeholder='Hankkeen nimi' type='text' {...props} />

  handleSubmit = () => {
    this.props.projectSetDeadlines()
    this.setState({ loading: true })
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state
    const { deadlines } = this.props
    return (
      <Modal closeOnDimmerClick={false} open={this.props.open} onClose={this.props.handleClose} centered={false} size='small' basic>
        <Modal.Header>Määräajat</Modal.Header>
        <Modal.Content>
          <Form>
            { deadlines.map((deadline, i) => {
              return (
                <div key={ deadline.phase_id }>
                  <h3 className='deadline-title'>{ deadline.phase_name }</h3>
                  <div className='deadline-input-container'>
                    { i === 0 &&<Field disabled={i !== 0} name={`${deadline.phase_name}-start`} field={{ type: 'datetime' }} /> }
                    { i !== 0 && <span className='disabled-rdt'>{ projectUtils.formatDate(deadline.start) }</span> }
                    <span className='deadline-splitter'>-</span>
                    <Field name={`${deadline.phase_name}-deadline`} field={{ type: 'datetime' }} />
                  </div>
                </div>
              )
            }) }
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={loading} onClick={this.handleClose}>Peruuta</Button>
          <Button disabled={loading} onClick={this.handleSubmit} color='green'>Tallenna</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  deadlines: deadlinesSelector(state)
})

const mapDispatchToProps = {
  projectSetDeadlines
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'deadlineModal'
  })(FormModal)
)