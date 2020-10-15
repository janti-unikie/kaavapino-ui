import { concat, difference, flattenDeep } from 'lodash'

const addZeroPrefixIfNecessary = value => (value < 10 ? `0${value}` : value)

const formatDate = value => {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${addZeroPrefixIfNecessary(day)}.${addZeroPrefixIfNecessary(month)}.${year}`
}

const formatTime = value => {
  const date = new Date(value)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${addZeroPrefixIfNecessary(hours)}:${addZeroPrefixIfNecessary(minutes)}`
}

const formatDateTime = date => `${formatDate(date)} ${formatTime(date)}`

const formatUsersName = user => {
  if (user) {
    return user.first_name || user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.email
  }
  return ''
}

const formatDeadlines = ({ name, deadlines, subtype }, phases) => {
  return {
    title: name,
    deadlines: deadlines.map(d => ({
      title: d.phase_name,
      start: new Date(d.start),
      end: new Date(d.deadline)
    })),
    colors: phases
      .filter(p => subtype === p.project_subtype)
      .sort((p1, p2) => p1.index - p2.index)
      .map(p => p.color_code)
  }
}

const isFieldMissing = (fieldName, isFieldRequired, attributeData) => {
  return (
    isFieldRequired &&
    (!attributeData.hasOwnProperty(fieldName) ||
      attributeData[fieldName] === null ||
      attributeData[fieldName] === '')
  )
}

const getUniqueUpdates = updates => {
  const ids = {}
  return [...updates].filter(({ name }) => {
    if (ids[name]) return false
    ids[name] = true
    return true
  })
}

const sortProjects = (projects, options) => {
  const targetAttributes = [
    'projectId',
    'name',
    'phase',
    'nextDeadline',
    'subtype',
    'modified_at',
    'user'
  ]
  const { sort, dir, phases, amountOfProjectsToShow, users } = options
  if (sort < 0) return projects
  return projects
    .slice(0, amountOfProjectsToShow)
    .sort((a, b) => {
      const p1 = formatFilterProject(a, true, phases, users)[targetAttributes[sort]]
      const p2 = formatFilterProject(b, true, phases, users)[targetAttributes[sort]]

      return dir === 0 ? (p1 > p2 ? 1 : -1) : p1 < p2 ? 1 : -1
    })
    .concat(projects.slice(amountOfProjectsToShow, projects.length))
}

const formatFilterProject = (project, sort = false, phases, users) => {
  const user = formatUsersName(users.find(u => u.id === project.user))
  const modified_at = sort
    ? new Date(project.modified_at).getTime()
    : formatDate(project.modified_at)
  const phase = formatPhase(project.phase, phases).index
  const subtype = project.subtype
  const name = project.name
  const projectId = project.attribute_data['hankenumero'] || '-'
  const itemDeadline = project.deadlines.find(d => d.phase_id === project.phase).deadline
  const nextDeadline = sort ? new Date(itemDeadline).getTime() : formatDate(itemDeadline)
  return { name, user, modified_at, phase, subtype, projectId, nextDeadline }
}

const formatPhase = (id, phases) => {
  const { index, name, color_code } = phases.find(phase => phase.id === id)
  return { index, phaseName: name, phaseColor: color_code }
}

const formatNextDeadline = (deadlines, phase) =>
  formatDate(deadlines.find(d => d.phase_id === phase).deadline)

const formatSubtype = (id, subtypes) => {
  const foundSubtype = subtypes.find(subtype => subtype.id === id)
  if (foundSubtype) {
    return foundSubtype.name
  }
}

const formatFieldset = (fieldset, sections, parentName) => {

  // Remove fieldset keys,only when adding a new fieldset
  const keys = (Object.keys(fieldset)).filter(key => key !== parentName)
  const fieldsetList = keys.filter(key => key.indexOf('fieldset') !== -1)
  const fieldsetAttributes = flattenDeep(
    fieldsetList.map(
      currentFieldset => getFieldsetAtributes(currentFieldset, sections)
    )
  )
  const allFieldsets = concat(fieldsetList, fieldsetAttributes)
  const nonFieldsets = difference(keys, allFieldsets)

  // Bug fix which caused saga crash
  if ( !keys || keys.length === 0) {
    return fieldset
  }

 // No fieldset values
 if (!parentName) {
  return fieldset
}  const returnValue = {}
  // Handle non fieldset values
  nonFieldsets.forEach(key => returnValue[key] = fieldset[key])

  // Handle fieldset values
  fieldsetList.forEach(currentFieldset => {
    const attributes= getFieldsetAtributes(currentFieldset, sections)
    returnValue[currentFieldset] = []
    attributes.forEach(attribute => {
      if (fieldset[attribute]) {
        returnValue[currentFieldset].push({ [attribute]: fieldset[attribute] })
      }
    })
  })
  return returnValue
}

const getParent = (sections, values) => {

  if  (!sections || !values ) {
    return
  }
  const keysToSearch = Object.keys(values)

   // Bug fix which caused saga crash
  if ( !keysToSearch || keysToSearch.length === 0) {
    return
  }
  let parentName

  // Check if fieldset is in keysToSearch
  keysToSearch.forEach(key => {
   if (key.indexOf('fieldset') !== -1) parentName = key
  })

  const keyToSearch = keysToSearch[0]
  if (parentName) return parentName
  /* We could skip this loop, if the redux store would update the currentProject.phase data
    *This loop can be removed when phase is fix'd
    * */
  sections.some(title => {
    if (parentName) return parentName

    title.fields.some(fieldset => {
      if (parentName) return parentName

      if (fieldset.fieldset_attributes.length !== 0) {
        fieldset.fieldset_attributes.some(attribute => {

          if (attribute.name === keyToSearch) {
            parentName = fieldset.name
            return parentName
          }
        })
      }
    })
  })
  return parentName
}

const getFieldsetAtributes = (parent, sections) => {
  let fieldsetAttributes
  sections.some(title => {
    if (fieldsetAttributes) return fieldsetAttributes
    title.fields.some(fieldset => {
      if (fieldset.name === parent) {
        fieldsetAttributes = fieldset.fieldset_attributes.map(key => key.name)
        return fieldsetAttributes
      }
    })
  })
  return fieldsetAttributes
}

const formatAttributeData = (parent, initialValues, newValues) => {
  const returnObj = {}
  const newKeys = Object.keys(newValues)
  //If adding fieldset for the first time
  if (!initialValues) {
    newKeys.forEach(key => returnObj[key] = newValues[key])
    return returnObj

  } else {
    // Create object from initialValues
    const initialObject = initialValues.reduce((obj, item) => {
      Object.assign(obj,item)
      return obj
    }, {})

    const initialKeys = Object.keys(initialObject)
    const keysToAdd = difference(newKeys, initialKeys)

    //Adding new keys to attributeData,
    keysToAdd.forEach(key => {
      returnObj[key] = newValues[key]
    })

    //Updating modified values
    initialKeys.forEach(key => {
      if (newValues.hasOwnProperty(key)) {
        returnObj[key] = newValues[key]
      } else {
        returnObj[key] = initialObject[key]
      }
    })
  }
  const attributeData = {}
  attributeData[parent] = [returnObj]
  return attributeData
}

const dataHasFieldset = (data) => {
  const keys = Object.keys(data)
  let returnValue = false
  keys.forEach(key => {
    if (key.indexOf('fieldset') !== -1) returnValue = key})
  return returnValue
}

const getFieldsetValue = (data, fieldsetName) => {
  let value
    data.forEach(index => {
      if (index.hasOwnProperty(fieldsetName)) value = index[fieldsetName]
    })
  return value
}

const checkInputValue = (props) => {
  if (props.parentName && props.attributeData[props.parentName]) {
    const inputValue = getFieldsetValue(props.attributeData[props.parentName], props.input.name)
    if (inputValue) props.input.value = inputValue
  }}

const getDefaultValue = (parentName, attributeData, name) => {
  if (attributeData[parentName]) {
    return getFieldsetValue(attributeData[parentName], name)
  }}

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatUsersName,
  formatDeadlines,
  isFieldMissing,
  getUniqueUpdates,
  sortProjects,
  formatFilterProject,
  formatPhase,
  formatNextDeadline,
  formatSubtype,
  formatFieldset,
  checkInputValue,
  getDefaultValue,
  getParent,
  formatAttributeData,
  dataHasFieldset
}
