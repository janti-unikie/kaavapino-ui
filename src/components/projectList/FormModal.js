import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import Radio from '../input/Radio'
import CreatePrinciplesRadio from '../input/CreatePrinciplesRadio'
import CreateDraftRadio from '../input/CreateDraftRadio'
import SelectInput from '../input/SelectInput'
import SubtypePicker  from '../input/SubtypePicker'
import projectUtils from '../../utils/projectUtils'

class FormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      showAdditional: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submitting && this.props.submitSucceeded) {
      this.handleClose()
    } else if (prevProps.submitting && this.props.submitFailed && !this.props.submitSucceeded && this.state.loading) {
      this.setState({ loading: false })
    }
  }

  formatUsers = () => {
    return this.props.users.map((user) => {
      return {
        key: user.id,
        value: user.id,
        text: projectUtils.formatUsersName(user)
      }
    })
  }

  projectNameInput = (props) => <Form.Input type='text' label='Projektin nimi' {...props} />
  projectPersonInput = (props) => <SelectInput options={this.formatUsers()} {...props} />
  projectPublicInput = (props) => <Radio double {...props} />
  projectSubtypeInput = (props) => <SubtypePicker onChange={this.testFunc(props.input.value)} {...props} />
  projectAdditionalInput = (props) => <CreatePrinciplesRadio {...props} />
  projectCreateDraftInput = (props) => <CreateDraftRadio {...props} />

  handleSubmit = () => {
    this.setState({ loading: true })
    this.props.handleSubmit()
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }
  testFunc = (input) => {
    if (input === 4) {
      this.setState({ showAdditional: true })
    } else {
      this.setState({ showAdditional: false })
    }
  }

  render() {
    const { loading, showAdditional } = this.state

    return (

      <Modal size={'small'} onClose={this.props.handleClose}  open={this.props.open} closeIcon>
        <Modal.Header>Luo uusi hanke</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <Field name='name' component={this.projectNameInput} />
              </Form.Field>
              <Form.Field>
                <label>vastuuhenkilö</label>
                <Field className="ui fluid input" name='user' component={this.projectPersonInput} />
              </Form.Field>
            </Form.Group>
            <h3>Luodaanko hanke julkiseksi?</h3>
            <Field name='public' component={this.projectPublicInput} />
            <h3>Valitse prosessin koko</h3>
            <Field name='subtype' component={this.projectSubtypeInput} />
            { showAdditional ? (
<>
                <h3>Valitse, laaditaanko</h3>
                  <Field name='create_principles' component={this.projectAdditionalInput} />
                  <Field name='create_draft' component={this.projectCreateDraftInput} />
                  </>
            ): null}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={loading} onClick={this.handleClose}>Peruuta</Button>
          <Button disabled={loading} type="submit" onClick={this.handleSubmit} color='blue'>Luo hanke</Button>
        </Modal.Actions>
      </Modal>

    )
  }
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'modal',
  initialValues: { public: true }
})(FormModal)