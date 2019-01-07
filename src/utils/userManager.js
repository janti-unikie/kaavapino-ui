import { createUserManager } from 'redux-oidc'
import { WebStorageStateStore, InMemoryWebStorage } from 'oidc-client'

const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`

const userManagerConfig = {
  client_id                 : process.env.REACT_APP_OPENID_CONNECT_CLIENT_ID,
  redirect_uri              : `${baseUrl}/callback`,
  response_type             : 'id_token token',
  scope                     : `openid profile email ${process.env.REACT_APP_OPENID_AUDIENCE}`,
  authority                 : 'https://api.hel.fi/sso/openid/',
  post_logout_redirect_uri  : `${baseUrl}/logout/callback`,
  automaticSilentRenew      : true,
  silent_redirect_uri       : `${baseUrl}/silent-renew`
}

if (process.env.NODE_ENV === 'test') {
  const stateStoreStorage = new InMemoryWebStorage()
  const userStoreStorage = new InMemoryWebStorage()

  userManagerConfig.stateStore = new WebStorageStateStore({ store: stateStoreStorage })
  userManagerConfig.userStore = new WebStorageStateStore({ store: userStoreStorage })
}

const userManager = createUserManager(userManagerConfig)

export default userManager
