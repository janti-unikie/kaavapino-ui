import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class File extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: null
    }

    this.id = props.name + '-123'
  }

  render() {
    return (
      <div>
        <Button
          icon='upload'
          as="label"
          htmlFor={this.id}
          label={{
            basic: true,
            content: `${this.state.current || 'Valitse tiedosto'}`
          }}
        />
        <input
          hidden
          id={this.id}
          multiple
          type="file"
          onChange={this.onChangeFile}
        />
      </div>
    )
  }

  onChangeFile = (e) => {
    const fileButton = document.getElementById(this.id)
    const file = fileButton ? fileButton.files[0] : null
    this.props.handleChange(file)
    const path = e.target.value.split('\\')
    this.setState({ current: path[path.length - 1] })
  }
}

export default File