import React from 'react'
import { mount } from 'enzyme'
import SelectInput from './SelectInput'

describe('<SelectInput />', () => {
  let selectInputComponent
  const options = ['a', 'b', 'c']
  let change
  beforeEach(() => {
    change = null
    selectInputComponent = mount(
      <SelectInput
        input={{ name: 'test', onChange: (value) => change = value }}
        meta={{}}
        options={options.map((option) => ({ key: option, value: option, text: option }))}
      />
    )
  })

  it('is initialized correctly', () => {
    const dropwDownComponent = selectInputComponent.find('Dropdown')
    expect(dropwDownComponent.props().name).toBe('test')
    expect(dropwDownComponent.props().placeholder).toBe('Klikkaa avataksesi')
    expect(dropwDownComponent.props().noResultsMessage).toBe('Ei tuloksia')
    expect(change).toBeNull()
  })

  it('has all option components', () => {
    const optionComponents = selectInputComponent.find('DropdownItem')
    expect(optionComponents.length).toBe(options.length)
    expect(optionComponents.at(0).props().text).toBe('a')
    expect(optionComponents.at(0).props().value).toBe('a')
  })

  it('can be changed', () => {
    selectInputComponent.find('DropdownItem').at(1).simulate('click')
    expect(change).toBe('b')
  })
})