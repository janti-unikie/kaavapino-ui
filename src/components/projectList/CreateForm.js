import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import SelectInput from '../input/SelectInput'
import Input from '../input/Input'

class CreateForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projectName: '',
      projectPerson: null
    }
  }

  handleInput = (name, value) => {
    const newState = {}
    newState[name] = value
    this.setState({ ...newState })
  }

  render() {
    return (
      <Modal closeOnDimmerClick={false} open={this.props.open} onClose={this.props.handleClose} centered={false} size='small' basic>
        <Modal.Header>Luo uusi hanke</Modal.Header>
        <Modal.Content>
          <h3>Hankkeen nimi</h3>
          <Input type='text' handleChange={this.handleInput} placeholder='Hankkeen nimi' name='projectName' />
          <h3>Hankkeen vastuuhenkilö</h3>
          <SelectInput options={['Pekka Penttinen', 'Essi Esimerkki', 'Jaana Juusonen']} handleChange={this.handleInput} name='projectPerson' />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose}>Peruuta</Button>
          <Button onClick={this.props.handleClose} color='green'>Luo hanke</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreateForm