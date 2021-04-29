import React from 'react'
import { mount } from 'enzyme'
import LoginPage from '../../../components/auth/Login'
import mockUserManager from '../../../utils/userManager'

describe('<Login />', () => {
  let loginWrapper
  let loginSpy

  beforeEach(() => {
    loginWrapper = mount(<LoginPage />)
    loginSpy = jest.spyOn(loginWrapper.instance(), 'handleLogin')
  })

  it('renders', () => {
    expect(loginWrapper.find('p').text()).toBe('Uudelleenohjataan...')
    expect(mockUserManager.signinRedirect).toHaveBeenCalledTimes(1)
    loginWrapper.instance().componentDidMount()
    expect(loginSpy).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    setInterval.mockClear()
    clearInterval.mockClear()
    loginSpy.mockClear()
  })
})
