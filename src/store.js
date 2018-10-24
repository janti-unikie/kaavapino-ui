import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { loadUser } from 'redux-oidc'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import reducers from './reducers'
import sagas from './sagas'
import userManager from './utils/userManager'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const combinedReducers = combineReducers({
  ...reducers
})

const store = createStore(
  connectRouter(history)(combinedReducers),
  applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history)
  )
)

sagaMiddleware.run(sagas)

loadUser(store, userManager)

export default store
