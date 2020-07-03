import React from 'react'
import { Form, Radio } from 'semantic-ui-react'

const PrincipleRadio = ({ input: { value, name, ...rest }, meta: { error }, ...custom }) => {
  let checked = false
  if (value === '' || value === null) {
    checked = false
  } else if (value) {
    checked = value
  }
  return (
    <div className={'radio-input-container'}>
      <Form.Field>
        <Radio
          toggle
          label='Suunniteluperjaatteet'
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(!checked)}
          checked={ checked === true }
        />
      </Form.Field>
    </div>
  )
}

export default PrincipleRadio