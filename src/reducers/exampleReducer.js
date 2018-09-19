import { SET_VALUE, REQUEST_VALUE } from '../actions/exampleActions'

const initialState = {
  value: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_VALUE: {
      return {
        ...state,
        value: 'loading...'
      }
    }

    case SET_VALUE: {
      return {
        ...state,
        value: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export default reducer