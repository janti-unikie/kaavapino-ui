import React from 'react'
import { mount } from 'enzyme'
import LogoutPage from '../../../components/auth/Logout'

describe('<Logout />', () => {
  let logoutWrapper
  let logoutMock = jest.fn(() => null)

  beforeEach(() => {
    logoutMock.mockClear()
    logoutWrapper = mount(<LogoutPage handleLogout={logoutMock} />)
  })

  it('renders', () => {
    expect(logoutWrapper.find('p').text()).toBe('Kirjaudutaan ulos...')
  })

  it('calls logout fn', () => {
    expect(logoutMock.mock.calls.length).toBe(1)
  })
})
