import React, { Component } from 'react'
import { connect } from 'react-redux'
import { projectFileUpload, projectFileRemove } from '../../actions/projectActions'
import { Button, Progress } from 'semantic-ui-react'
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
    this.state = { percentCompleted: 0, current, uploading: false, reading: false }
    this.inputRef = React.createRef()
    if (props.image) {
      this.imageRef = React.createRef()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src && !prevProps.uploading) {
      const { src } = this.props
      if (!src) {
        this.inputRef.current.value = ''
        this.imageRef.current.src = ''
        this.setState({ current: null })
        return
      }
      const urlParts = src.split('/')
      this.setState({ current: urlParts[urlParts.length - 1] })
      this.imageRef.current.src = src
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

  cancel = () => {
    if (this.cancelToken) {
      this.cancelToken.cancel()
    }
    this.inputRef.current.value = ''
    this.setState({ percentCompleted: 0, uploading: false, reading: false })
  }

  render() {
    const { current, uploading, percentCompleted } = this.state
    const { field, image } = this.props
    return (
      <div>
        <div className='file-input-container'>
          <Button
            disabled={uploading}
            icon='upload'
            as='label'
            htmlFor={field.name}
            label={{
              basic: true,
              content: `${this.state.current || (uploading && 'Ladataan...') || 'Valitse tiedosto'}`
            }}
            onClick={this.handleClick}
            ref={this.inputButtonRef}
            style={{ overflow: 'auto' }}
          />
          { !uploading && current && <FontAwesomeIcon size='lg' color='red' className='remove-file-icon' icon='times' onClick={this.reset} /> }
          { uploading && <FontAwesomeIcon size='lg' color='red' className='remove-file-icon' icon='times' onClick={this.cancel} /> }
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
        { uploading && <Progress percent={percentCompleted} progress indicating /> }
        { <img style={{ display: `${(current && image) ? 'block' : 'none'}` }} className='image-preview' ref={this.imageRef} alt={current ? current : ''} /> }
      </div>
    )
  }

  callback = (progressEvent, onCompleted) => {
    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
    this.setState({ percentCompleted })
    if (percentCompleted === 100) {
      setTimeout(() => {
        this.setState({ uploading: false })
        onCompleted()
      }, 300)
    }
  }

  onChangeFile = (e) => {
    const { field, image, projectFileUpload } = this.props
    const file = this.inputRef.current.files[0]
    const path = e.target.value.split('\\')
    const onCompleted = () => {
      this.setState({ current: path[path.length - 1], reading: true })
      try {
        const reader = new FileReader()
        if (image) {
          reader.onloadend = () => {
            this.imageRef.current.src = reader.result
            this.setState({ reading: false })
          }
        }
        reader.readAsDataURL(file)
      } catch (e) {
        return
      }
    }
    projectFileUpload({
      attribute: field.name,
      file,
      callback: (e) => this.callback(e, onCompleted),
      setCancelToken: (token) => this.cancelToken = token
    })
    this.setState({ uploading: true, percentCompleted: 0 })
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