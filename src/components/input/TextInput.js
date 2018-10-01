import React from 'react'
import { Input, FormGroup } from 'reactstrap'

const TextInput = ({ title }) => {
  return (
    <div>
      <FormGroup>
        <Input type='text' className='input' placeholder={ title } />
      </FormGroup>
    </div>
  )
}

export default TextInput