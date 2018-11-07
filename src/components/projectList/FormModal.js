import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import SelectInput from '../input/SelectInput'
import Input from '../input/Input'
import { reduxForm, Field } from 'redux-form'

class FormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  getUsersName = (user) => {
    if (user) {
      return (user.first_name && user.last_name) ? `${user.first_name} ${user.last_name}` : user.email
    }
    return ''
  }

  formatOptions = () => {
    return this.props.users.map((user) => {
      return {
        key: user.id,
        value: user.id,
        text: this.getUsersName(user)
      }
    })
  }

  projectNameInput = (props) => <Input placeholder='Hankkeen nimi' type='text' {...props} />

  projectPersonInput = (props) => <SelectInput options={this.formatOptions()} {...props} />

  componentDidUpdate(prevProps) {
    if (prevProps.submitting && this.props.submitSucceeded) {
      this.handleClose()
    } else if (prevProps.submitting && this.props.submitFailed && !this.props.submitSucceeded && this.state.loading) {
      this.setState({ loading: false })
    }
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    this.props.handleSubmit()
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state
    this.formatOptions()
    return (
      <Modal closeOnDimmerClick={false} open={this.props.open} onClose={this.props.handleClose} centered={false} size='small' basic>
        <Modal.Header>Luo uusi hanke</Modal.Header>
        <Modal.Content>
          <Form>
            <h3>Hankkeen nimi</h3>
            <Field name='name' component={this.projectNameInput} />
            <h3>Hankkeen vastuuhenkilö</h3>
            <Field name='user' component={this.projectPersonInput} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={loading} onClick={this.handleClose}>Peruuta</Button>
          <Button disabled={loading} onClick={this.handleSubmit} color='green'>Luo hanke</Button>
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
  form: 'modal'
})(FormModal)