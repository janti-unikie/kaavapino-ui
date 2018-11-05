import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { OidcProvider } from 'redux-oidc'
import axios from 'axios'
import App from './components/App'
import store from './store'
import userManager from './utils/userManager'
import iconHandler from './utils/iconHandler'
import apiUtils from './utils/apiUtils'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

// Initialize axios
axios.interceptors.request.use((config) => ({
  ...config,
  responseType: 'json',
  headers: {
    ...config.headers,
    'Content-Type': 'application/json',
    'Authorization': `bearer ${apiUtils.getToken()}`
  }
}))

// Initialize icons
iconHandler.initIcons()

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider userManager={userManager} store={store}>
      <App />
    </OidcProvider>
  </Provider>,
  document.getElementById('root')
)
