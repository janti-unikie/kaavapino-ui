import React, { useState, useEffect } from 'react'
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

function ProjectCardPage( { attributeData, deadlines } ) {

  const [descriptionFields, setDescriptionDFields  ] = useState([])
  const [ basicInformationFields, setBasicInformationFields ] = useState([])
  const [contactsFields, setContactsFields  ] = useState([])
  const [ photoField, setPhotoField ] = useState( null )
  const [ strategyConnectionFields, setStrategyConnectionFields ] = useState([])
  const [ timeTableFields, setTimeTableFields ] = useState([])
  const [ floorAreaFields, setFloorAreaFields ] = useState([])
  const [ contractFields, setContractFields ] = useState([])
  const [ documentFields, setDocumentFields ] = useState([])
  const [ planningRestriction, setPlanningRestriction ] = useState(null)

  useEffect(() => {
      buildPage()
    }, [])

  const buildPage = () => {

    const currentDescriptionFields = []
    const currentBasicInformationFields= []
    const currentContactsFields = []
    let currentPhotoField = null
    const currentStrategyConnectionFields = []
    const currentTimeTableFields = []
    const currentFloorAreaFields = []
    const currentContractFields = []
    const currentDocumentFields = []
    let currentPlanningRestriction = null

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
       currentPhotoField = newField
      }
      if ( field.display === 'basic') {
        currentBasicInformationFields.push( newField )
      }
      if ( field.display === 'description') {
        currentDescriptionFields.push( newField )
      }
      if ( field.display === 'strategy') {
        currentStrategyConnectionFields.push( newField )
      }
      if ( field.display === 'contract') {
        currentContractFields.push( newField )
      }
      if ( field.display === 'floor-area-information') {
        currentFloorAreaFields.push( newField )
      }
      if ( field.display === 'timetable') {
        currentTimeTableFields.push( newField )
      }
      if ( field.display === 'contact') {
        currentContactsFields.push( newField )
      }
      if ( field.display === 'documents') {
        currentDocumentFields.push( newField )
      }
      if ( field.display === 'geometry') {
        currentPlanningRestriction = newField
      }
     })

     setDescriptionDFields(currentDescriptionFields)
     setBasicInformationFields(currentBasicInformationFields)
     setContactsFields(currentContactsFields)
     setPhotoField( currentPhotoField )
     setStrategyConnectionFields( currentStrategyConnectionFields )
     setTimeTableFields( currentTimeTableFields )
     setFloorAreaFields( currentFloorAreaFields )
     setContractFields( currentContractFields)
     setDocumentFields( currentDocumentFields )
     setPlanningRestriction( currentPlanningRestriction )

  }

  const renderFirstRow = () => (
    <Grid stackable columns='equal'>
        <Grid.Column width={8}>
          <Segment><Description fields={descriptionFields}/></Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment><Photo field={photoField} /></Segment>
        </Grid.Column>
    </Grid>
  )
  const renderTimeLineRow = () => {

    return (
      <Grid stackable columns='equal'>
        <Grid.Column>
          <Segment><ProjectTimeline deadlines={deadlines} /></Segment>
        </Grid.Column>
      </Grid>
    )
  }
  const renderSecondRow = () => {

    return (
      <Grid stackable columns='equal'>
          <Grid.Column width={5}>
            <Segment>
              <Contacts fields={contactsFields}/>
            </Segment>
            <Segment key="basic-information">
              <StrategyConnection fields={strategyConnectionFields}/>
          </Segment>
            <Segment>
                <TimeTable fields={timeTableFields}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <FloorAreaInformation fields={floorAreaFields} />
            </Segment>
            <Grid columns='equal'>
              <Grid.Column className="inner-left-column">
                <Segment key="basic-information">
                  <BasicInformation fields={basicInformationFields} />
                </Segment>
              </Grid.Column>
              <Grid.Column className="inner-right-column">
                <Segment>
                  <Contract fields={contractFields} />
                </Segment>
              </Grid.Column>
            </Grid>
            <Segment>
              <GeometryInformation field={planningRestriction} />
            </Segment>
            <Segment>
              <Documents fields={documentFields} />
            </Segment>
          </Grid.Column>
      </Grid>
    )
  }
  const firstRow = renderFirstRow()
  const secondRow = renderSecondRow()
  const timelineRow = renderTimeLineRow()

  return (
    <div className="project-card">
        {firstRow}
        {timelineRow}
        {secondRow}
    </div>
  )
}

export default ProjectCardPage