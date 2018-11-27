import React from 'react'
import { TextArea } from 'semantic-ui-react'

const CustomTextArea = ({ input: { onChange, ...rest }, ...custom }) => (
  <TextArea
    onChange={(e) => onChange(e.target.value)}
    {...rest}
    {...custom}
  />
)

export default CustomTextArea