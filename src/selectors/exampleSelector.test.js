import { exampleValueSelector } from './exampleSelector'

describe('exampleSelector', () => {
  const state = { example: { value: 22 } }

  it('exampleValueSelector', () => {
    const val = exampleValueSelector(state)
    expect(val).toBe(22)
  })
})