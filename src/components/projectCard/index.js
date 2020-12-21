import React, { PureComponent } from 'react'
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
import projectUtils from '../../utils/projectUtils'
import GeometryInformation from './GeometryInformation'

class ProjectCardPage extends PureComponent {

  state = {
    descriptionFields: [],
    basicInformationFields: [],
    contactsFields: [],
    photoField:null,
    strategyConnectionFields: [],
    timeTableFields: [],
    floorAreaFields: [],
    contractFields: [],
    documentFields: [],
    planningRestriction: null
  }

  componentDidMount() {
    const { projectTypes } = this.props
    if (projectTypes) {
      this.updateMetadata()
    }
    this.buildPage()

  }

  buildPage = () => {
    const { attributeData } = this.props

    const descriptionFields = []
    const basicInformationFields= []
    const contactsFields = []
    let photoField = null
    const strategyConnectionFields = []
    const timeTableFields = []
    const floorAreaFields = []
    const contractFields = []
    const documentFields = []
    let planningRestriction = null

    fieldsMockData.forEach( field => {
      const value = projectUtils.findValueFromObject( attributeData, field.name )

      let newField = {
        ...field,
        value: value === undefined ? null : value
      }
      if ( field.display === 'photo') {
        newField = {
          ...field,
          link: value === undefined ? null :  value.link,
          description: value === undefined ? null :  value.description

        }
       photoField = newField
      }
      if ( field.display === 'basic') {

          basicInformationFields.push( newField )
      }
      if ( field.display === 'description') {
        descriptionFields.push( newField )
      }
      if ( field.display === 'strategy') {
        strategyConnectionFields.push( newField )
      }
      if ( field.display === 'contract') {
        contractFields.push( newField )
      }
      if ( field.display === 'floor-area-information') {
       floorAreaFields.push( newField )
      }
      if ( field.display === 'timetable') {
       timeTableFields.push( newField )
      }
      if ( field.display === 'contact') {
        contactsFields.push( newField )
      }
      if ( field.display === 'documents') {
        documentFields.push( newField )
      }

      if ( field.display === 'geometry') {
          planningRestriction = newField
        }
     })

     this.setState( {
      descriptionFields,
      basicInformationFields,
      contactsFields,
      photoField,
      strategyConnectionFields,
      timeTableFields,
      floorAreaFields,
      contractFields,
      documentFields,
      planningRestriction
     })
  }

  renderFirstRow = () => (
    <Grid stackable columns='equal'>
        <Grid.Column width={8}>
          <Segment><Description fields={this.state.descriptionFields}/></Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment><Photo field={this.state.photoField} /></Segment>
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
              <Contacts fields={this.state.contactsFields}/>
            </Segment>
            <Segment key="basic-information">
              <StrategyConnection fields={this.state.strategyConnectionFields}/>
          </Segment>
            <Segment>
                <TimeTable fields={this.state.timeTableFields}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <FloorAreaInformation fields={this.state.floorAreaFields} />
            </Segment>
            <Grid columns='equal'>
              <Grid.Column className="inner-left-column">
                <Segment key="basic-information">
                  <BasicInformation fields={this.state.basicInformationFields} />
                </Segment>
              </Grid.Column>
              <Grid.Column className="inner-right-column">
                <Segment>
                  <Contract fields={this.state.contractFields} />
                </Segment>
              </Grid.Column>
            </Grid>
            <Segment>
              <GeometryInformation field={this.state.planningRestriction} />
            </Segment>
            <Segment>
              <Documents fields={this.state.documentFields} />
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

export default ProjectCardPage