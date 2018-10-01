import React from 'react'
import { Input, FormGroup } from 'reactstrap'

const Multiple = ({ options }) => {
  return (
    <FormGroup>
      <Input className='input multiple' type='select' multiple>
        { options.map((option, i) => <option key={i}>{ option }</option>) }
      </Input>
    </FormGroup>
  )
}

export default Multiple