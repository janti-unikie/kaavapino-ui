export const FETCH_PROJECTS = 'Fetch projects'
export const FETCH_PROJECTS_SUCCESSFUL = 'Fetch projects successful'
export const CREATE_PROJECT = 'Create project'
export const CREATE_PROJECT_SUCCESSFUL = 'Create project successful'

export const fetchProjects = () => ({ type: FETCH_PROJECTS })

export const fetchProjectsSuccessful = (projects) => ({ type: FETCH_PROJECTS_SUCCESSFUL, payload: projects })

export const createProject = () => ({ type: CREATE_PROJECT })

export const createProjectSuccessful = (project) => ({ type: CREATE_PROJECT_SUCCESSFUL, payload: project })
