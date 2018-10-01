import React from 'react'
import { FormGroup, Input } from 'reactstrap'

const TextArea = ({ title }) => {
  return (
    <FormGroup>
      <Input className='input text-area' type='textarea' placeholder={ title } rows={8} />
    </FormGroup>
  )
}

export default TextArea