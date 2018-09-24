import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { OidcProvider } from 'redux-oidc'
import App from './components/App'
import store from './store'
import userManager from './utils/userManager'

console.log(process.env.REACT_APP_VALUE)

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider userManager={userManager} store={store}>
      <App />
    </OidcProvider>
  </Provider>,
  document.getElementById('root')
)
