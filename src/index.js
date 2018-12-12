import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { OidcProvider, processSilentRenew } from 'redux-oidc'
import { init as sentryInit } from '@sentry/browser'
import App from './components/App'
import store from './store'
import userManager from './utils/userManager'
import iconHandler from './utils/iconHandler'
import apiUtils from './utils/apiUtils'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

if (window.location.pathname === '/silent-renew') {
  processSilentRenew()
} else {
  // Initialize axios
  apiUtils.initAxios()

  // Initialize icons
  iconHandler.initIcons()

  // Initialize sentry
  if (process.env.NODE_ENV === 'production') {
    sentryInit({ dsn: process.env.REACT_APP_SENTRY_URL })
  }

  ReactDOM.render(
    <Provider store={store}>
      <OidcProvider userManager={userManager} store={store}>
        <App />
      </OidcProvider>
    </Provider>,
    document.getElementById('root')
  )
}
