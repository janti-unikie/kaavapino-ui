import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { reduxForm } from 'redux-form'
import configureStore from 'redux-mock-store'
import Field from '../../../components/input/Field'
import iconHandler from '../../../utils/iconHandler'

describe('<Field />', () => {
  let wrapper
  let store

  beforeAll(() => {
    iconHandler.initIcons()
  })

  beforeEach(() => {
    const mockStore = configureStore()
    const initialState = { project: { checking: true } }
    store = mockStore(initialState)
    wrapper = null
  })

  const createFieldOfType = (type, fieldProps = {}, inputProps = {}) => {
    const props = {
      attributeData: {
        '1': 'a',
        '2': 'b',
        '3': 'c',
        '4': 'd',
        file: { link: '1', description: '2' }
      },
      field: { name: '1', type, required: true, ...inputProps },
      fields: [],
      ...fieldProps
    }
    const formWrapper = () => (
      <div>
        <Field {...props} />
      </div>
    )
    const Decorated = reduxForm({ form: 'testForm' })(formWrapper)
    wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>
    )
  }

  it('renders', () => {
    createFieldOfType('short_string')
    expect(wrapper.find('Field').length).toBe(1)
    expect(wrapper.find('input').length).toBe(1)
  })

  it('renders different types', () => {
    createFieldOfType('short_string')
    expect(wrapper.find('input').props().type).toBe('text')
    createFieldOfType('long_string')
    expect(wrapper.find('textarea').length).toBe(1)
    createFieldOfType('boolean')
    expect(wrapper.find('RadioBooleanButton').length).toBe(1)
    createFieldOfType('date')
    expect(wrapper.find('input').props().type).toBe('date')
    createFieldOfType('number')
    expect(wrapper.find('input').props().type).toBe('number')
    createFieldOfType('fieldset', { fieldset: true })
    expect(wrapper.find('FieldSet').length).toBe(1)
    createFieldOfType('file', {}, { name: 'file' })
    expect(wrapper.find('File').length).toBe(1)
    createFieldOfType('image', {}, { name: 'file' })
    expect(wrapper.find('File').length).toBe(1)
    createFieldOfType(
      'short_string',
      {},
      {
        choices: [
          { value: 'a', label: '1' },
          { value: 'b', label: '2' }
        ],
        multiple_choice: true
      }
    )
    expect(wrapper.find('SelectInput').length).toBe(1)
    expect(wrapper.find('SelectInput').props().type).toBe('select-multiple')
    const options = wrapper.find('DropdownItem')
    expect(options.length).toBe(2)
    expect(options.at(0).props().value).toBe('a')
    expect(options.at(0).props().text).toBe('1')
  })

  it('updates only when necessary', () => {
    const props = {
      attributeData: {
        '1': 'a',
        '2': 'b',
        '3': 'c',
        '4': 'd'
      },
      field: { name: '1', type: 'short_string', required: true },
      fields: []
    }
    const renderSpy = jest.spyOn(Field.prototype, 'render')
    const test = shallow(<Field {...props} />)

    expect(renderSpy).toHaveBeenCalledTimes(1)
    test.setProps({ attributeData: { '1': 'a' } })
    expect(renderSpy).toHaveBeenCalledTimes(1)
    test.setProps({ attributeData: { '1': 'b' } })
    expect(renderSpy).toHaveBeenCalledTimes(2)
    renderSpy.mockRestore()
  })
})
