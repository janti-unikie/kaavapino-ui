import { call } from 'redux-saga/effects'

export function* executeService(service, ...params) {
  try {
    const result = yield call(service, ...params)
    return result
  } catch (e) {
    throw Error(e)
  }
}
