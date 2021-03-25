import React from 'react'
import { mount } from 'enzyme'
import CustomTextArea from '../../../components/input/CustomTextArea'

describe('<TextArea />', () => {
  let textAreaComponent
  let change
  beforeEach(() => {
    change = ''
    textAreaComponent = mount(
      <CustomTextArea
        input={{ value: '123', name: 'test', onChange: e => (change = e.target.value) }}
        meta={{}}
      />
    ).find('textarea')
  })

  it('has value and name', () => {
    const { value, name } = textAreaComponent.instance()
    expect(value).toBe('123')
    expect(name).toBe('test')
  })

  it('can be changed', () => {
    textAreaComponent.simulate('change', { target: { value: 'test' } })
    expect(change).toBe('test')
  })

  it('can have custom props', () => {
    const customComponent = mount(
      <CustomTextArea input={{}} meta={{}} placeholder="123" />
    ).find('textarea')
    const { placeholder } = customComponent.instance()
    expect(placeholder).toBe('123')
  })
})
