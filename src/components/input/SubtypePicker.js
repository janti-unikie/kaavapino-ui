import React from 'react'
import { Form, Radio } from 'semantic-ui-react'

const CustomRadio = ({ input: { value, name, ...rest }, meta: { error }, ...custom }) => {
  let checked = 1
  if (value === '' || value === null) {
    checked = null
  } else if (value) {
    checked = value
  }
  return (
    <div className={'subtype-input-container'}>
      <Form.Field>
        <Radio
          label=''
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(1)}
          checked={ checked === 1 }
        />
        <span>XS</span>
      </Form.Field>
      <Form.Field>
        <Radio
          label=''
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(2)}
          checked={ checked === 2 }
        />
        <span>S</span>
      </Form.Field>
      <Form.Field>
        <Radio
          label=''
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(3)}
          checked={ checked === 3 }
        />
        <span>M</span>
      </Form.Field>
      <Form.Field>
        <Radio
          label=''
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(4)}
          checked={ checked === 4 }
        />
        <span>L</span>
      </Form.Field>
      <Form.Field>
        <Radio
          label=''
          { ...custom }
          error={ error }
          name={ name }
          onChange={() => rest.onChange(5)}
          checked={ checked === 5 }
        />
        <span>XL</span>
      </Form.Field>
    </div>
  )
}

export default CustomRadio