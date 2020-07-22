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
  formatSubtype
}
