import { all } from 'redux-saga/effects'
import { incrementSaga } from './exampleSaga'

const sagas = function* sagas() {
  yield all([
    incrementSaga()
  ])
}

export default sagas