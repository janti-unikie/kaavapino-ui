import React from 'react'
import { mount } from 'enzyme'
import Info from '../../../components/input/Info'

describe('<Info />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Info className="test" content="test" />)
  })

  it('renders', () => {
    expect(wrapper.find('.test').length).toBe(1)
  })
})
