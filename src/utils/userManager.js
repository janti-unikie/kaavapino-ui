import { createUserManager } from 'redux-oidc'

const userManagerConfig = {
  client_id     : process.env.REACT_APP_OPENID_CONNECT_CLIENT_ID,
  redirect_uri  : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type : 'id_token token',
  scope         : null,
  authority     : 'https://api.hel.fi/sso/openid/'
}

const userManager = createUserManager(userManagerConfig)

export default userManager
