import React from 'react'
import { TextArea } from 'semantic-ui-react'

const CustomTextArea = ({ input, meta: { error }, ...custom }) => (
  <div className="textarea-wrapper">
    <TextArea {...input} {...custom} error={error} />
  </div>
)

export default CustomTextArea
