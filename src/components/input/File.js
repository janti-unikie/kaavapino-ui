import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class File extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: null
    }

    this.id = props.name + '-file'
    this.inputRef = React.createRef()
    this.imageRef = React.createRef()
  }

  handleClick = (e) => {
    e.preventDefault()
    this.inputRef.current.click()
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
          onClick={this.handleClick}
        />
        <br />
        <input
          ref={this.inputRef}
          hidden
          id={this.id}
          multiple
          type="file"
          onChange={this.onChangeFile}
        />
        <img className='image-preview' ref={this.imageRef} />
      </div>
    )
  }

  onChangeFile = (e) => {
    const fileButton = document.getElementById(this.id)
    const file = fileButton ? fileButton.files[0] : null
    this.props.handleChange(this.props.name, file)
    const path = e.target.value.split('\\')
    this.setState({ current: path[path.length - 1] })
    try {
      const reader = new FileReader()
      reader.onloadend = () => this.imageRef.current.src = reader.result
      reader.readAsDataURL(e.target.files[0])
    } catch (e) {
      return
    }
  }
}

export default File