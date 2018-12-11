import React from 'react'
import { mount } from 'enzyme'
import Info from '../../../components/input/Info'

describe('<Info />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Info content='test' />)
  })

  it('renders', () => {
    expect(wrapper.find('.input-info').length).toBe(1)
  })

  it('shows content', () => {
    wrapper.find('.input-info').simulate('click')
    expect(wrapper.find('.content').length).toBe(1)
    expect(wrapper.find('.content').text()).toBe('test')
  })
})