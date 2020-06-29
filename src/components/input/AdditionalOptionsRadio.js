import React from 'react'
import { Form, Radio } from 'semantic-ui-react'

const CustomRadio = ({ input: { value, name, ...rest }, meta: { error }, inverted, ...custom }) => {
  let checked = 'n'
  if (value === '' || value === null) {
    checked = '-'
  } else if (value) {
    checked = 'y'
  }
  return (
    <div className={`radio-input-container${inverted ? ' inverted' : ''}`}>
      <Form.Field>
        <Radio
          label='Suunnitteluperiaatteet'
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(true)}
          checked={ checked === 'y' }
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label='Kaavaluonnos'
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(false)}
          checked={ checked === 'n' }
        />
      </Form.Field>
    </div>
  )
}

export default CustomRadio