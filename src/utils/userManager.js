import { createUserManager } from 'redux-oidc'

const userManagerConfig = {
  client_id     : process.env.REACT_APP_OPENID_CONNECT_CLIENT_ID,
  redirect_uri  : `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type : 'id_token token',
  scope         : 'openid email',
  authority     : 'https://api.hel.fi/sso/openid/',
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/logout/callback`
}

const userManager = createUserManager(userManagerConfig)

export default userManager
