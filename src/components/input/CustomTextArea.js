import React from 'react'
import { TextArea } from 'hds-react'

const CustomTextArea = ({ input, meta: { error }, ...custom }) => {
  return (
    <div className="textarea-wrapper">
      <TextArea {...input} {...custom} error={error} />
    </div>
  )
}

export default CustomTextArea
