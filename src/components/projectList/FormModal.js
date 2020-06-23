import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Select, Radio } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import SelectInput from '../input/SelectInput'
import projectUtils from '../../utils/projectUtils'

class FormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      publicValue: 'yes',
      projectType: '1'
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

  formatSubtypes = () => {
    return this.props.projectSubtypes.map((subtype) => ({
      key: subtype.id,
      value: subtype.id,
      text: subtype.name
    }))
  }

  projectSubtypeInput = (props) => <SelectInput options={this.formatSubtypes()} {...props} />

  handleSubmit = () => {
    this.setState({ loading: true })
    this.props.handleSubmit()
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }

  handleChangePublic = (e, { value }) => this.setState({ publicValue: value })
  handleChangeProjectType = (e, { value }) => this.setState({ projectType: value })
  render() {
    const { loading } = this.state

    return (

      <Modal size={'small'} onClose={this.props.handleClose}  open={this.props.open} closeIcon>
        <Modal.Header>Luo uusi hanke</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                type='text'
                name='name'
                label='Projektin nimi'
                placeholder='Projektin nimi'
              />
              <Form.Field
                control={Select}
                name='user'
                options={this.formatUsers()}
                label={{ children: 'Vastuuhenkilö' }}
                placeholder='Vastuuhenkilö'
                search
              />
            </Form.Group>
            <h3>Luodaanko hanke julkiseksi?</h3>
            <Form.Field>
              <Radio
                label='Kyllä'
                name='public'
                value='yes'
                checked={this.state.publicValue === 'yes'}
                onChange={this.handleChangePublic}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Ei'
                name='public'
                value='no'
                checked={this.state.publicValue === 'no'}
                onChange={this.handleChangePublic}
              />
            </Form.Field>
            <h3>Valitse prosessin koko</h3>
            <Field name='subtype' component={this.projectSubtypeInput} />
            <h3>Valitse, laaditaanko</h3>
            <Form.Field>
              <Radio
                label='Suunnitteliperiaatteet'
                name='projectType'
                value='1'
                checked={this.state.projectType === '1'}
                onChange={this.handleChangeProjectType}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Kaavaluonnos'
                name='projectType'
                value='2'
                checked={this.state.projectType === '2'}
                onChange={this.handleChangeProjectType}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={loading} onClick={this.handleClose}>Peruuta</Button>
          <Button disabled={loading} onClick={this.handleSubmit} color='blue'>Luo hanke</Button>
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