import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-localstorage-mock'

jest.useFakeTimers()
jest.mock('./utils/userManager')

configure({ adapter: new Adapter() })
