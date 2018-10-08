import React from 'react'
import { Input } from 'semantic-ui-react'

class CustomInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
    this.props.handleChange(this.props.name, e.target.value)
  }

  render() {
    const { type, name, placeholder } = this.props
    return (
      <div>
        <Input type={type} onChange={this.handleChange} name={name} fluid value={this.state.value} placeholder={placeholder} />
      </div>
    )
  }
}

export default CustomInput