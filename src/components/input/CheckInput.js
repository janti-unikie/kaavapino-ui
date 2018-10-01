import React from 'react'
import { Input, FormGroup, Label } from 'reactstrap'

const CheckInput = ({ title }) => {
  return (
    <div>
      <FormGroup check>
        <Label check>
          <Input type='checkbox' /> { ' ' }
          <span>{ title }</span>
        </Label>
      </FormGroup>
    </div>
  )
}

export default CheckInput