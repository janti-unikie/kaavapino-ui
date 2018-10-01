import React from 'react'
import { FormGroup, Input } from 'reactstrap'

const SelectInput = ({ options }) => {
  return (
    <FormGroup>
      <Input className='input' type='select' name='select'>
        { options.map((option, i) => <option key={i}>{ option }</option>) }
      </Input>
    </FormGroup>
  )
}

export default SelectInput