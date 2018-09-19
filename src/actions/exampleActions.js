export const REQUEST_VALUE = 'Example request value'
export const SET_VALUE = 'Example set value'

export const requestValue = () => ({ type: REQUEST_VALUE })

export const setValue = (value) => ({ type: SET_VALUE, payload: value })
