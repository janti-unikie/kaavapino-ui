import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('<Button />', () => {
  it('has value and handleClick function', () => {
    const value = 'test'
    const mockHandler = jest.fn()
    const buttonComponent = shallow(<Button value={ value } handleClick={ mockHandler } />)
    const btnValue = buttonComponent.text()
    expect(btnValue).toBe(value)
    buttonComponent.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(1)
  })
})