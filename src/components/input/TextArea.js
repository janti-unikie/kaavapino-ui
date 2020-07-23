import React from 'react'
import { TextArea } from 'semantic-ui-react'

const CustomTextArea = ({ input, meta: { error }, ...custom }) => (
  <TextArea {...input} {...custom} error={error} />
)

export default CustomTextArea
