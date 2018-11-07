import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader, Radio } from 'semantic-ui-react'
import { projectTypesSelector } from '../../selectors/projectTypeSelector'
import Summary from './Summary'
import Image from './Image'

class ProjectCardPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      metadata: null,
      extended: false
    }
  }

  componentDidMount() {
    const { projectTypes } = this.props
    if (projectTypes) {
      this.updateMetadata()
    }
  }

  componentDidUpdate(prevProps) {
    const { projectTypes } = this.props
    if (!prevProps.projectTypes && projectTypes) {
      this.updateMetadata()
    }
  }

  updateMetadata = () => {
    const { projectTypes, type } = this.props
    const metadata = projectTypes.find((projectType) => projectType.id === type).metadata
    this.setState({ metadata })
  }

  filterAttributeData = () => {
    const { metadata, extended } = this.state
    const { attributeData } = this.props
    const currentMetadata = extended ?
      metadata.extended_project_card_attributes :
      metadata.normal_project_card_attributes
    let result = []
    currentMetadata.forEach(({ label, name, type }) => {
      const data = { label, type }
      if (Object.keys(attributeData).includes(name) && attributeData[name] !== null) {
        data['value'] = attributeData[name]
      } else {
        data['empty'] = true
      }
      result = result.concat(data)
    })
    return result
  }

  handleExtendedChange = () => {
    this.setState((prevState) => ({ extended: !prevState.extended }))
  }

  render() {
    const { metadata, extended } = this.state
    if (!metadata) {
      return <Loader inline={'centered'} active>Ladataan</Loader>
    }
    const attributeData = this.filterAttributeData()
    return (
      <div>
        <div className='project-card-container'>
          <Summary
            attributeData={attributeData}
          />
          <Image />
        </div>
        <div>
          <Radio onChange={this.handleExtendedChange} toggle label='Laajennettu' checked={extended} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  projectTypes: projectTypesSelector(state)
})

export default connect(
  mapStateToProps
)(ProjectCardPage)