import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { loadUser } from 'redux-oidc'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import reducers from './reducers'
import sagas from './sagas'
import userManager from './utils/userManager'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ...reducers
  })

const middlewareArray = [routerMiddleware(history), sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true
  })
  middlewareArray.push(logger)
}

const composeEnhancers = composeWithDevTools({})

const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middlewareArray))
)

sagaMiddleware.run(sagas)

loadUser(store, userManager)

export default store
