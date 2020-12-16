import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { fieldsMockData } from './fieldsMockData'
import { isBoolean, isArray } from 'lodash'

class ProjectCardPage extends Component {

  descriptionFields = []
  basicInformationFields = []
  contactsFields = []
  photoFields = []
  strategyConnectionFields = []
  timeTableFields = []
  floorAreaFields = []
  contractFields = []

  componentDidMount() {
    const { projectTypes, attributeData } = this.props
    if (projectTypes) {
      this.updateMetadata()
    }

    fieldsMockData.forEach( field => {
      const value = attributeData[field.name]
      let newField = field

      if ( field.display === 'basic') {

        if (  value || isBoolean(value)) {
          newField = {
            ...field,
            value
          }
        }
        this.basicInformationFields.push( newField )
      }
      if ( field.display === 'description') {
        console.log( value )
        if (  value || isBoolean(value) || isArray( value )) {
          newField = {
            ...field,
            value
          }
          console.log( newField )
        }
        this.descriptionFields.push( newField )
      }
    })

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
        <Grid.Column width={8}>
          <Segment><Description fields={this.descriptionFields}/></Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment><Photo fields={this.photoFields} src={'/hankekuva.png'}/></Segment>
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
            <Contacts fields={this.contactsFields}/>
          </Segment>
          <Segment>
            <StrategyConnection  fields={this.strategyConnectionFields}/>
        </Segment>
          <Segment>
              <TimeTable fields={this.timeTableFields}/>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <FloorAreaInformation fields={this.floorAreaFields} />
          </Segment>
          <Grid columns='equal'>
            <Grid.Column className="inner-column">
              <Segment >
                <BasicInformation fields={this.basicInformationFields} />
              </Segment>
            </Grid.Column>
            <Grid.Column className="inner-column">
              <Segment>
                <Contract fields={this.contractFields} />
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
