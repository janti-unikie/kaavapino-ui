import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  reset = () => {
    this.inputRef.current.value = ''
    this.props.handleChange(this.props.name, null)
    this.setState({ current: null })
  }

  render() {
    const { current } = this.state
    return (
      <div>
        <div className='file-input-container'>
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
          { current && <FontAwesomeIcon size='lg' color='red' className='remove-file-icon' icon='times' onClick={this.reset} /> }
        </div>
        <br />
        <input
          ref={this.inputRef}
          hidden
          id={this.id}
          multiple
          type="file"
          onChange={this.onChangeFile}
        />
        { current && <img className='image-preview' ref={this.imageRef} alt='preview' /> }
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