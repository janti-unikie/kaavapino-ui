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
import { isBoolean } from 'lodash'
import projectUtils from '../../utils/projectUtils'
import GeometryInformation from './GeometryInformation'

class ProjectCardPage extends Component {

  descriptionFields = []
  basicInformationFields = []
  contactsFields = []
  photoField = null
  strategyConnectionFields = []
  timeTableFields = []
  floorAreaFields = []
  contractFields = []
  documentFields = []
  planningRestriction = null

  componentDidMount() {
    const { projectTypes, attributeData } = this.props
    if (projectTypes) {
      this.updateMetadata()
    }

    fieldsMockData.forEach( field => {
      const value = projectUtils.findValueFromObject( attributeData, field.name )

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
          newField = {
            ...field,
            value
          }
        this.descriptionFields.push( newField )
      }
      if ( field.display === 'strategy') {
          newField = {
            ...field,
            value
        }
        this.strategyConnectionFields.push( newField )
      }
      if ( field.display === 'contract') {
          newField = {
            ...field,
            value: value === undefined ? null : value
        }
        this.contractFields.push( newField )
      }
      if ( field.display === 'floor-area-information') {
        newField = {
          ...field,
          value: value === undefined ? null : value
      }
       this.floorAreaFields.push( newField )
      }
      if ( field.display === 'timetable') {
        newField = {
          ...field,
          value: value === undefined ? null : value
      }
       this.timeTableFields.push( newField )
      }
      if ( field.display === 'contact') {
        newField = {
          ...field,
          value: value === undefined ? null : value
      }
       this.contactsFields.push( newField )
      }
      if ( field.display === 'documents') {
        newField = {
          ...field,
          value: value === undefined ? null : value
      }
       this.documentFields.push( newField )
      }
      if ( field.display === 'photo') {
        newField = {
          ...field,
          link: value === undefined ? null :  value.link,
          description: value === undefined ? null :  value.description

      }
       this.photoField = newField
      }
      if ( field.display === 'geometry') {
        newField = {
          ...field,
          value: value === undefined ? null : value
      }
      this.planningRestriction = newField
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
          <Segment><Photo field={this.photoField} /></Segment>
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
  renderSecondRow = () => {

    return (
      <Grid stackable columns='equal'>
          <Grid.Column width={5}>
            <Segment>
              <Contacts fields={this.contactsFields}/>
            </Segment>
            <Segment key="basic-information">
              <StrategyConnection fields={this.strategyConnectionFields}/>
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
              <Grid.Column className="inner-left-column">
                <Segment key="basic-information">
                  <BasicInformation fields={this.basicInformationFields} />
                </Segment>
              </Grid.Column>
              <Grid.Column className="inner-right-column">
                <Segment>
                  <Contract fields={this.contractFields} />
                </Segment>
              </Grid.Column>
            </Grid>
            <Segment>
              <GeometryInformation field={this.planningRestriction} />
            </Segment>
            <Segment>
              <Documents fields={this.documentFields} />
            </Segment>
          </Grid.Column>
      </Grid>
    )
  }

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
