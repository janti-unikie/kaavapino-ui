import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { projectTypesSelector } from '../../selectors/projectTypeSelector'
import { usersSelector } from '../../selectors/projectSelector'
import { Grid, Segment } from 'semantic-ui-react'
import BasicInformation from './BasicInformation'
import Contract from './Contract'
import Description from './Description'
import ProjectTimeline from '../ProjectTimeline/ProjectTimeline'
import TimeTable from './Timetable'
import Contacts from './Contacts'
import FloorAreaInformation from './FloorAreaInformation'
import StrategyConnection from './StrategyConnection'
import Photo from './Photo'
import Documents from './Documents'

class ProjectCardPage extends Component {
  constructor(props) {
    super(props)

    let imageSrc = null
    if (props.attributeData.hankekortin_kuva) {
      imageSrc = props.attributeData.hankekortin_kuva
    }
    const imageLink = imageSrc ? imageSrc.link : null

    this.state = {
      metadata: null,
      extended: false,
      imageLink
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
    const metadata = projectTypes.find(projectType => projectType.id === type).metadata
    this.setState({ metadata })
  }

  handleExtendedChange = () => {
    this.setState(prevState => ({ extended: !prevState.extended }))
  }
  renderFirstRow = () => (
    <Grid stackable columns='equal'>
        <Grid.Column width={5}>
          <Segment><Description /></Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment><Photo src={'/hankekuva.png'}/></Segment>
        </Grid.Column>
    </Grid>
  )
  renderTimeLineRow = () => {
    const { deadlines } = this.props

    return (
      <Grid stackable columns='equal'>
        <Grid.Column>
          <Segment><ProjectTimeline deadlines={deadlines} /></Segment>
        </Grid.Column>
      </Grid>
    )
  }
  renderSecondRow = () => (
    <Grid stackable columns='equal'>
        <Grid.Column width={5}>
          <Segment>
            <Contacts />
          </Segment>
          <Segment>
            <StrategyConnection />
        </Segment>
          <Segment>
              <TimeTable />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <FloorAreaInformation />
          </Segment>
          <Grid columns='equal'>
            <Grid.Column className="inner-column">
              <Segment >
                <BasicInformation />
              </Segment>
            </Grid.Column>
            <Grid.Column className="inner-column">
              <Segment>
                <Contract />
              </Segment>
            </Grid.Column>
          </Grid>
          <Segment>
            <Photo src={'/kartta.png'} />
          </Segment>
          <Segment>
            <Documents />
          </Segment>
        </Grid.Column>
    </Grid>
    )

  render() {
    const { metadata } = this.state
    if (!metadata) {
      return (
        <Loader inline={'centered'} active>
          Ladataan
        </Loader>
      )
    }

    const firstRow = this.renderFirstRow()
    const secondRow = this.renderSecondRow()
    const timelineRow = this.renderTimeLineRow()

    return (
      <div className="project-card">
          {firstRow}
          {timelineRow}
          {secondRow}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projectTypes: projectTypesSelector(state),
  users: usersSelector(state)
})

export default connect(mapStateToProps)(ProjectCardPage)
