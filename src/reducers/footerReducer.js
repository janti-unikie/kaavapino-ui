import { FETCH_FOOTER_SUCCESFUL } from '../actions/footerActions'

export const initialState = {
  footers: {}
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOOTER_SUCCESFUL: {
      return {
        ...state,
        footers: action.payload
      }
    }

    default: {
      return state
    }
  }
}
