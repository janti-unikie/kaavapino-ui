import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { reduxForm } from 'redux-form'
import configureStore from 'redux-mock-store'
import Matrix from '../../../components/input/Matrix'

describe('<Matrix />', () => {
  let wrapper

  beforeEach(() => {
    const mockStore = configureStore()
    const initialState = { project: { checking: true } }
    const store = mockStore(initialState)
    const props = {
      field: {
        matrix: {
          rows: ['row1', 'row2'],
          columns: ['col1', 'col2'],
          fields: [{ name: '1', type: 'short_string', required: true }, { name: '2', type: 'short_string', required: true }, { name: '3', type: 'short_string' }, { name: '4', type: 'short_string' }]
        }
      },
      attributeData: {
        '2': '',
        '3': 'c',
        '4': 'd'
      }
    }
    const Decorated = reduxForm({ form: 'testForm' })(Matrix)
    wrapper = mount(
      <Provider store={store}>
        <Decorated store={store} {...props} />
      </Provider>
    )
  })

  it('renders', () => {
    expect(wrapper.find('.matrix').length).toBe(1)
    const inputs = wrapper.find('input')
    expect(inputs.length).toBe(4)
    for (let i = 0; i < 4; i++) {
      expect(inputs.at(i).props().name).toBe(`${i + 1}`)
    }
  })

  it('can be highlighted', () => {
    expect(wrapper.find('.highlighted').length).toBe(2)
  })
})