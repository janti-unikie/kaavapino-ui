import React, { Component } from 'react'
import { Input, FormGroup, Button } from 'reactstrap'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: 1
    }
  }

  add = () => {
    this.setState({ inputs: this.state.inputs + 1 })
  }

  remove = () => {
    const { inputs } = this.state
    if (inputs === 1) {
      return
    }
    this.setState({ inputs: inputs - 1 })
  }

  renderInputs = () => {
    const { title } = this.props
    const inputs = []
    for (let i = 0; i < this.state.inputs; i++) {
      inputs.push(<Input key={i} type='text' className='input' placeholder={ title } />)
    }
    return inputs
  }

  render() {
    const { inputs } = this.state
    return (
      <FormGroup>
        <div className='list-items'>
          { this.renderInputs() }
        </div>
        <div className='list-buttons'>
          <Button color='primary' disabled={inputs === 1} onClick={this.remove}>-</Button>
          <Button color='primary' onClick={this.add}>+</Button>
        </div>
      </FormGroup>
    )
  }
}

export default List