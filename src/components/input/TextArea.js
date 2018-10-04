import React from 'react'
import { TextArea } from 'semantic-ui-react'

class CustomTextArea extends React.Component {
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
    const { title, name } = this.props
    return <TextArea onChange={this.handleChange} name={name} placeholder={title} />
  }
}

export default CustomTextArea