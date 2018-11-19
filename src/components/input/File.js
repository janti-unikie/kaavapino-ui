import React, { Component } from 'react'
import { connect } from 'react-redux'
import { projectFileUpload, projectFileRemove } from '../../actions/projectActions'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class File extends Component {
  constructor(props) {
    super(props)

    let current = null
    if (props.src) {
      const { src } = props
      const urlParts = src.split('/')
      current = urlParts[urlParts.length - 1]
    }
    this.state = { current }
    this.inputRef = React.createRef()
    if (props.image) {
      this.imageRef = React.createRef()
    }
  }

  componentDidMount() {
    const { src, image } = this.props
    if (src && image) {
      this.imageRef.current.src = src
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    this.inputRef.current.click()
  }

  reset = () => {
    const { projectFileRemove, field: { name } } = this.props
    this.inputRef.current.value = ''
    this.setState({ current: null })
    projectFileRemove(name)
  }

  render() {
    const { current } = this.state
    const { field, image } = this.props
    return (
      <div>
        <div className='file-input-container'>
          <Button
            icon='upload'
            as='label'
            htmlFor={field.name}
            label={{
              basic: true,
              content: `${this.state.current || 'Valitse tiedosto'}`
            }}
            onClick={this.handleClick}
            ref={this.inputButtonRef}
          />
          { current && <FontAwesomeIcon size='lg' color='red' className='remove-file-icon' icon='times' onClick={this.reset} /> }
        </div>
        <br />
        <input
          ref={this.inputRef}
          hidden
          id={field.name}
          multiple
          type="file"
          onChange={this.onChangeFile}
        />
        { current && image && <img className='image-preview' ref={this.imageRef} alt={current} /> }
      </div>
    )
  }

  onChangeFile = (e) => {
    const { field, image, projectFileUpload } = this.props
    const file = this.inputRef.current.files[0]
    projectFileUpload({ attribute: field.name, file })
    const path = e.target.value.split('\\')
    this.setState({ current: path[path.length - 1] })
    try {
      const reader = new FileReader()
      if (image) {
        reader.onloadend = () => this.imageRef.current.src = reader.result
      }
      reader.readAsDataURL(e.target.files[0])
    } catch (e) {
      return
    }
  }
}

const mapDispatchToProps = {
  projectFileUpload,
  projectFileRemove
}

export default connect(
  null,
  mapDispatchToProps
)(File)