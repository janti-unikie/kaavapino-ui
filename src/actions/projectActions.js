export const FETCH_INPUTS = 'Fetch inputs'
export const FETCH_INPUTS_SUCCESSFUL = 'Fetch inputs successful'
export const FETCH_OWN_PROJECTS = 'Fetch own projects'
export const FETCH_OWN_PROJECTS_SUCCESSFUL = 'Fetch own projects successful'
export const FETCH_ALL_PROJECTS = 'Fetch all projects'
export const FETCH_ALL_PROJECTS_SUCCESSFUL = 'Fetch all project successful'
export const FETCH_PROJECT = 'Fetch project'
export const FETCH_PROJECT_SUCCESSFUL = 'Fetch project successful'

export const fetchInputs = (phase) => ({ type: FETCH_INPUTS, payload: phase })

export const fetchInputsSuccessful = (inputs) => ({ type: FETCH_INPUTS_SUCCESSFUL, payload: inputs })

export const fetchOwnProjects = () => ({ type: FETCH_OWN_PROJECTS })

export const fetchOwnProjectsSuccessful = (projects) => ({ type: FETCH_OWN_PROJECTS_SUCCESSFUL, payload: projects })

export const fetchAllProjects = () => ({ type: FETCH_ALL_PROJECTS })

export const fetchAllProjectsSuccessful = (projects) => ({ type: FETCH_ALL_PROJECTS_SUCCESSFUL, payload: projects })

export const fetchProject = (id) => ({ type: FETCH_PROJECT, payload: id })

export const fetchProjectSuccessful = (project) => ({ type: FETCH_PROJECT_SUCCESSFUL, payload: project })
