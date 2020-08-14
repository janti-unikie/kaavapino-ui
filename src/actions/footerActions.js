export const FETCH_FOOTER = 'Get footer content'
export const FETCH_FOOTER_SUCCESFUL = 'Get footer content succesful'

export const fetchFooter = () => ({ type: FETCH_FOOTER })

export const fetchFooterSuccessful = footer => ({
  type: FETCH_FOOTER_SUCCESFUL,
  payload: footer
})
