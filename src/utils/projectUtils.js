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

const formatPayload = (fieldset, sections, parentName, initialValues) => {
  const keys = Object.keys(fieldset)
  const fieldsetList = keys.filter(key => key.indexOf('fieldset') !== -1)
  const fieldsetAttributes = flattenDeep(
    fieldsetList.map(
      currentFieldset => getFieldsetAttributes(currentFieldset, sections)
    )
  )
  const allFieldsets = concat(fieldsetList, fieldsetAttributes)
  const nonFieldsets = difference(keys, allFieldsets)
  // Bug fix which caused saga crash
  if (!keys || keys.length === 0) return fieldset

  const returnValue = {}

  // No fieldset values, fieldsets have attributes
  if (fieldsetAttributes.length === 0) {
    nonFieldsets.forEach(key => returnValue[key] = fieldset[key])
    return returnValue
  }

  // Handle non fieldset values
  if (nonFieldsets.length !== 0) nonFieldsets.forEach(key => returnValue[key] = fieldset[key])

  fieldsetList.forEach(currentFieldset => {
    const attributes= getFieldsetAttributes(currentFieldset, sections)
    const currentObject = {}
    attributes.forEach(attribute => {
      //use new value for this field
      if (fieldset[attribute]) {
        currentObject[attribute] = fieldset[attribute]
      // use initlavalue
      } else if (initialValues[attribute]) {
        currentObject[attribute] = initialValues[attribute]
      }
    })
    returnValue[currentFieldset] = [currentObject]
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

const getFieldsetAttributes = (parent, sections) => {
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

const generateArrayOfYears = () => {
  const max = new Date().getFullYear()
  const min = max - 20
  const years = []

  // eslint-disable-next-line for-direction
  for ( let year = max; year >= min ; year-- ) {
    years.push( { key: year.toString(),  label: year.toString(), value: year } )
  }
  return years
}

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
  checkInputValue,
  getDefaultValue,
  getParent,
  formatPayload,
  generateArrayOfYears
}
