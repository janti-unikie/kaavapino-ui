import { createStore, combineReducers, applyMiddleware } from 'redux'
import { loadUser } from 'redux-oidc'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import userManager from './utils/userManager'

const sagaMiddleware = createSagaMiddleware()

const combinedReducers = combineReducers({
  ...reducers
})

const store = createStore(
  combinedReducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(sagas)

loadUser(store, userManager)

export default store
