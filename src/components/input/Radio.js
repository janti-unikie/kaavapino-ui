import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const Radio = ({ title }) => {
  return (
    <FormGroup inline={true}>
      <div className='radio-container'>
        <FormGroup check>
          <Label check>
            <Input type="radio" name={`radio-${title}`}/>{' '}
          Kyllä
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name={`radio-${title}`} />{' '}
            Ei
          </Label>
        </FormGroup>
      </div>
    </FormGroup>
  )
}

export default Radio