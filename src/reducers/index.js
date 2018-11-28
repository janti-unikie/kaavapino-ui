import { reducer as auth } from 'redux-oidc'
import { reducer as form } from 'redux-form'
import { reducer as project } from './projectReducer'
import { reducer as user } from './userReducer'
import { reducer as phase } from './phaseReducer'
import { reducer as schema } from './schemaReducer'
import { reducer as projectType } from './projectTypeReducer'
import { reducer as document } from './documentReducer'
import { reducer as comment } from './commentReducer'

export default {
  auth,
  form,
  project,
  user,
  phase,
  schema,
  projectType,
  document,
  comment
}