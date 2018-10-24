import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import SelectInput from '../input/SelectInput'
import Input from '../input/Input'
import { reduxForm, Field } from 'redux-form'

class FormModal extends Component {
  projectNameInput = (props) => <Input placeholder='Hankkeen nimi' type='text' {...props} />

  projectPersonInput = (props) => <SelectInput options={['Pekka Penttinen', 'Essi Esimerkki', 'Jaana Juusonen']} {...props} />

  render() {
    return (
      <Modal closeOnDimmerClick={false} open={this.props.open} onClose={this.props.handleClose} centered={false} size='small' basic>
        <Modal.Header>Luo uusi hanke</Modal.Header>
        <Modal.Content>
          <Form>
            <h3>Hankkeen nimi</h3>
            <Field name='projectName' component={this.projectNameInput} />
            <h3>Hankkeen vastuuhenkilö</h3>
            <Field name='projectPerson' component={this.projectPersonInput} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>Peruuta</Button>
          <Button color='green'>Luo hanke</Button>
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