import React from 'react'
import { Input, FormGroup } from 'reactstrap'

const Date = () => {
  return (
    <FormGroup>
      <Input type='date' className='input' placeholder='date placeholder' />
    </FormGroup>
  )
}

export default Date