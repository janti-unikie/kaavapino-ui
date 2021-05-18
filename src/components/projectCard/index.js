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
import GeometryInformation from './GeometryInformation'
import Photo from './Photo'
import Documents from './Documents'
import projectUtils from './../../utils/projectUtils'
import { getExternalDocuments, initializeProject } from '../../actions/projectActions'
import {
  externalDocumentsSelector,
  currentProjectSelector
} from '../../selectors/projectSelector'
import { connect } from 'react-redux'
import { getProjectCardFields } from '../../actions/schemaActions'
import { projectCardFieldsSelector } from '../../selectors/schemaSelector'

export const PROJECT_PICTURE = 'Projektikortin kuva'
export const PROJECT_BASIC = 'Perustiedot'
export const PROJECT_DESCRIPTION = 'Suunnittelualueen kuvaus'
export const PROJECT_STRATEGY = 'Strategiakytkentä'
export const PROJECT_CONTRACT = 'Maanomistus ja maankäyttösopimus'
export const PROJECT_FLOOR_AREA = 'Kerrosalatiedot'
export const PROJECT_TIMETABLE = 'Aikataulu'
export const PROJECT_CONTACT = 'Yhteyshenkilöt'
export const PROJECT_DOCUMENTS = 'Dokumentit'
export const PROJECT_BORDER = 'Suunnittelualueen raja'

function ProjectCardPage({
  projectId,
  getExternalDocuments,
  getProjectCardFields,
  externalDocuments,
  projectCardFields,
  currentProject,
  initializeProject
}) {
  const [descriptionFields, setDescriptionDFields] = useState([])
  const [basicInformationFields, setBasicInformationFields] = useState([])
  const [contactsFields, setContactsFields] = useState([])
  const [photoField, setPhotoField] = useState(null)
  const [strategyConnectionFields, setStrategyConnectionFields] = useState([])
  const [timeTableFields, setTimeTableFields] = useState([])
  const [floorAreaFields, setFloorAreaFields] = useState([])
  const [contractFields, setContractFields] = useState([])
  const [planningRestriction, setPlanningRestriction] = useState(null)
  const [currentProjectId, setCurrentProjectId] = useState(projectId)

  useEffect(() => {
    getProjectCardFields()
    getExternalDocuments(projectId)
  }, [])

  useEffect(() => {
    buildPage()
  }, [projectCardFields, externalDocuments])

  useEffect(() => {
    setCurrentProjectId(projectId)
  }, [projectId])

  useEffect(() => {
    if (currentProject.id.toString() !== projectId.toString()) {
      initializeProject(currentProjectId)
    }
  }, [currentProjectId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const buildPage = () => {
    const currentDescriptionFields = []
    const currentBasicInformationFields = []
    const currentContactsFields = []
    let currentPhotoField = null
    const currentStrategyConnectionFields = []
    const currentTimeTableFields = []
    const currentFloorAreaFields = []
    const currentContractFields = []
    let currentPlanningRestriction = null

    projectCardFields &&
      projectCardFields.forEach(field => {
        let value = projectUtils.findValueFromObject(
          currentProject && currentProject.attribute_data,
          field.name
        )

        const returnValues = []
        projectUtils.findValuesFromObject(
          currentProject && currentProject.attribute_data,
          field.name,
          returnValues
        )

        if (returnValues.length > 1) {
          let currentValues = []
          returnValues.forEach(current => {
            currentValues.push(current)
          })
          value = currentValues
        }

        let newField = {
          ...field,
          value: value === undefined ? null : value
        }
        if (field.section_name === PROJECT_PICTURE) {
          newField = {
            ...field,
            link: value === undefined ? null : value.link,
            description: value === undefined ? null : value.description
          }
          currentPhotoField = newField
        }
        if (field.section_name === PROJECT_BASIC) {
          currentBasicInformationFields.push(newField)
        }
        if (field.section_name === PROJECT_DESCRIPTION) {
          currentDescriptionFields.push(newField)
        }
        if (field.section_name === PROJECT_STRATEGY) {
          currentStrategyConnectionFields.push(newField)
        }
        if (field.section_name === PROJECT_CONTRACT) {
          currentContractFields.push(newField)
        }
        if (field.section_name === PROJECT_FLOOR_AREA) {
          currentFloorAreaFields.push(newField)
        }
        if (field.section_name === PROJECT_TIMETABLE) {
          currentTimeTableFields.push(newField)
        }
        if (field.section_name === PROJECT_CONTACT) {
          currentContactsFields.push(newField)
        }
        if (field.section_name === PROJECT_BORDER) {
          currentPlanningRestriction = newField
        }
      })

    setDescriptionDFields(currentDescriptionFields)
    setBasicInformationFields(currentBasicInformationFields)
    setContactsFields(currentContactsFields)
    setPhotoField(currentPhotoField)
    setStrategyConnectionFields(currentStrategyConnectionFields)
    setTimeTableFields(currentTimeTableFields)
    setFloorAreaFields(currentFloorAreaFields)
    setContractFields(currentContractFields)
    setPlanningRestriction(currentPlanningRestriction)
  }

  const renderFirstRow = () => (
    <Grid stackable columns="equal">
      <Grid.Column width={8}>
        <Segment>
          <Description fields={descriptionFields} />
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Photo field={photoField} />
        </Segment>
      </Grid.Column>
    </Grid>
  )
  const renderTimeLineRow = () => {
    return (
      <Grid stackable columns="equal">
        <Grid.Column>
          <Segment>
            <ProjectTimeline
              deadlines={currentProject && currentProject.deadlines}
              projectView={true}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
  const renderSecondRow = () => {
    return (
      <Grid stackable columns="equal">
        <Grid.Column width={5}>
          <Segment>
            <Contacts fields={contactsFields} />
          </Segment>
          <Segment key="basic-information">
            <StrategyConnection fields={strategyConnectionFields} />
          </Segment>
          <Segment>
            <TimeTable fields={timeTableFields} />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <FloorAreaInformation fields={floorAreaFields} />
          </Segment>
          <Grid columns="equal">
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
            <Documents documentFields={externalDocuments} />
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
const mapDispatchToProps = {
  getExternalDocuments,
  getProjectCardFields,
  initializeProject
}

const mapStateToProps = state => {
  return {
    externalDocuments: externalDocumentsSelector(state),
    projectCardFields: projectCardFieldsSelector(state),
    currentProject: currentProjectSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCardPage)
