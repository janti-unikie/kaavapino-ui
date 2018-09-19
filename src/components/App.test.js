import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import App from './App'
import Button from './common/Button'
import store from '../store'

describe('<App />', () => {
  let app

  beforeAll(() => {
    app = mount(<Provider store={store}><App /></Provider>)
    app.update()
  })

  it('renders', () => {
    const value = app.find('.current-value')
    expect(value.text()).toBe('0')
  })

  it('updates value when button is clicked', () => {
    const value = app.find('.current-value')
    const btn = app.find(Button)
    btn.simulate('click')
    app.update()
    // Service is mocked to always return 10
    expect(value.text()).toBe('10')
  })
})