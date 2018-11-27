import React from 'react'
import { TextArea } from 'semantic-ui-react'

const CustomTextArea = ({ input, ...custom }) => (
  <TextArea
    {...input}
    {...custom}
  />
)

export default CustomTextArea