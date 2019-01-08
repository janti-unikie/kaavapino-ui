import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader, Radio } from 'semantic-ui-react'
import { projectTypesSelector } from '../../selectors/projectTypeSelector'
import Summary from './Summary'
import Image from './Image'
import Graph from '../common/Graph'
import projectUtils from '../../utils/projectUtils'

class ProjectCardPage extends Component {
  constructor(props) {
    super(props)

    let imageSrc = null
    if (props.attributeData.hankekortin_kuva) {
      imageSrc = props.attributeData.hankekortin_kuva
    }

    this.state = {
      metadata: null,
      extended: false,
      imageSrc
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
      if (!projectUtils.isFieldMissing(name, true, attributeData)) {
        data['value'] = attributeData[name]
      } else {
        data['empty'] = true
      }
      result.push(data)
    })
    return result
  }

  handleExtendedChange = () => {
    this.setState((prevState) => ({ extended: !prevState.extended }))
  }

  render() {
    const { metadata, extended, imageSrc } = this.state
    const { deadlines, name, phases, subtype } = this.props
    const graphData = [projectUtils.formatDeadlines({ name, deadlines, subtype }, phases)]
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
          <Image src={imageSrc} />
        </div>
        <div className='project-card-extend'>
          <Radio onChange={this.handleExtendedChange} toggle label='Laajennettu' checked={extended} />
        </div>
        <Graph data={graphData} height={140} />
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