import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: [{ val: '' }]
    }
  }

  add = () => {
    this.setState({ inputs: this.state.inputs.concat({ val: '' }) })
  }

  remove = () => {
    const { inputs } = this.state
    if (inputs.length === 1) {
      return
    }
    this.setState({ inputs: inputs.slice(0, -1) })
    this.props.handleChange(this.props.name, inputs.slice(0, -1))
  }

  handleChange = (e, i) => {
    const inputs = this.state.inputs
    this.setState({ ...(inputs[i].val = e.target.value) })
    this.props.handleChange(this.props.name, this.state.inputs)
  }

  renderInputs = () => {
    const inputs = []
    for (let i = 0; i < this.state.inputs.length; i++) {
      inputs.push(<Input onChange={(e) => this.handleChange(e, i)} key={i} type='text' className='input' placeholder='-' value={this.state.inputs[i].val} />)
    }
    return inputs
  }

  render() {
    const { inputs } = this.state
    return (
      <div>
        <div className='list-items'>
          { this.renderInputs() }
        </div>
        <div className='list-buttons'>
          <Button disabled={inputs.length === 1} onClick={this.remove}>-</Button>
          <Button onClick={this.add}>+</Button>
        </div>
      </div>
    )
  }
}

export default List