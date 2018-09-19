import exampleReducer from './exampleReducer'
import deepFreeze from 'deep-freeze'

import { REQUEST_VALUE, SET_VALUE } from '../actions/exampleActions'

describe('exampleReducer', () => {
  let state

  beforeEach(() => {
    state = {}
    deepFreeze(state)
  })

  it('REQUEST_VALUE', () => {
    const action = {
      type: REQUEST_VALUE
    }
    const newState = exampleReducer(state, action)
    expect(newState.value).toBe('loading...')
  })

  it('SET_VALUE', () => {
    const action = {
      type: SET_VALUE,
      payload: 10
    }
    const newState = exampleReducer(state, action)
    expect(newState.value).toBe(10)
  })
})