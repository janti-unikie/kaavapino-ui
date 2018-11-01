import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { loadUser, USER_FOUND } from 'redux-oidc'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import reducers from './reducers'
import sagas from './sagas'
import userManager from './utils/userManager'
import apiUtils from './utils/apiUtils'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const combinedReducers = combineReducers({
  ...reducers
})

// Custom API middleware
const apiMiddleware = () => next => action => {
  if (action.type === USER_FOUND) {
    apiUtils.setToken(action.payload.id_token)
  }
  next(action)
}

const store = createStore(
  connectRouter(history)(combinedReducers),
  applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
    apiMiddleware
  )
)

sagaMiddleware.run(sagas)

loadUser(store, userManager)

export default store
