export const FETCH_PROJECTS = 'Fetch projects'
export const FETCH_PROJECTS_SUCCESSFUL = 'Fetch projects successful'

export const fetchProjects = () => ({ type: FETCH_PROJECTS })

export const fetchProjectsSuccessful = (projects) => ({ type: FETCH_PROJECTS_SUCCESSFUL, payload: projects })
