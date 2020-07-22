import React from 'react'
import { mount } from 'enzyme'
import Radio from '../../../components/input/RadioBooleanButton'

describe('<Radio />', () => {
  let wrapper
  let change

  beforeEach(() => {
    wrapper = mount(
      <Radio
        input={{ value: '', name: 'test', onChange: value => (change = value) }}
        meta={{}}
      />
    )
  })

  it('is initialized correctly', () => {
    expect(wrapper.find('input')).toHaveLength(3)
    const radioButtons = wrapper.find('Radio')
    expect(radioButtons.at(0).props().checked).toBe(false)
    expect(radioButtons.at(1).props().checked).toBe(false)
    expect(radioButtons.at(2).props().checked).toBe(true)
  })

  it('can be changed', () => {
    wrapper
      .find('Radio')
      .at(0)
      .simulate('click')
    expect(change).toBe(true)
    wrapper
      .find('Radio')
      .at(1)
      .simulate('click')
    expect(change).toBe(false)
    const positiveRadio = mount(
      <Radio
        input={{ value: true, name: 'test', onChange: value => (change = value) }}
        meta={{}}
      />
    )
    positiveRadio
      .find('Radio')
      .at(2)
      .simulate('click')
    expect(change).toBe(null)
  })

  it('can have default value', () => {
    const positiveRadio = mount(
      <Radio
        input={{ value: true, name: 'test', onChange: value => (change = value) }}
        meta={{}}
      />
    )
    expect(
      positiveRadio
        .find('Radio')
        .at(0)
        .props().checked
    ).toBe(true)
    const negativeRadio = mount(
      <Radio
        input={{ value: false, name: 'test', onChange: value => (change = value) }}
        meta={{}}
      />
    )
    expect(
      negativeRadio
        .find('Radio')
        .at(1)
        .props().checked
    ).toBe(true)
  })
})
