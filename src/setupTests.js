import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
jest.mock('./services/exampleService')

configure({ adapter: new Adapter() })
