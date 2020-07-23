import React from 'react'
import { mount } from 'enzyme'
import Button from '../../../components/common/Button'

describe('<Button />', () => {
  let btn
  let mockFn

  beforeEach(() => {
    mockFn = jest.fn(() => null)
    btn = mount(
      <Button
        handleClick={mockFn}
        icon={<div className="icon" />}
        help="help"
        value="button-test"
      />
    )
  })

  it('renders', () => {
    expect(btn.find('button').length).toBe(1)
    expect(btn.find('button').text()).toBe(' button-test')
  })

  it('can be clicked', () => {
    btn.find('button').simulate('click')
    expect(mockFn.mock.calls.length).toBe(1)
    btn.find('button').simulate('click')
    expect(mockFn.mock.calls.length).toBe(2)
  })

  it('has icon', () => {
    expect(btn.find('.icon').length).toBe(1)
  })

  it('has help text', () => {
    expect(btn.find('Popup').length).toBe(1)
    expect(btn.find('Popup').props().content).toBe('help')
  })

  it('can be loading', () => {
    const loadingMockFn = jest.fn(() => null)
    const loadingBtn = mount(<Button loading handleClick={loadingMockFn} />)
    expect(loadingBtn.find('Loader').length).toBe(1)
    btn.find('button').simulate('click')
    expect(loadingMockFn.mock.calls.length).toBe(0)
    btn.find('button').simulate('click')
    expect(loadingMockFn.mock.calls.length).toBe(0)
  })
})
