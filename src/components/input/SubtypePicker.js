import React from 'react'
import { Form, Radio, Container, Grid } from 'semantic-ui-react'

const CustomRadio = ({ input: { value, name, ...rest }, meta: { error }, ...custom }) => {
  let checked = 0
  if (value === '' || value === null) {
    checked = null
  } else if (value) {
    checked = value
  }
  return (
    <div className={'subtype-input-container'}>
      <Container>
        <Grid>
          <Grid.Column>
            <Form.Field>
              <Radio
                label=''
                { ...custom }
                error={ error }
                name={ name }
                onChange={() => rest.onChange(0)}
                checked={ checked === 0 }
              />
              <span>XS</span>
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Radio
                label=''
                { ...custom }
                error={ error }
                name={ name }
                onChange={() => rest.onChange(1)}
                checked={ checked === 1 }
              />
              <span>S</span>
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Radio
                label=''
                { ...custom }
                error={ error }
                name={ name }
                onChange={() => rest.onChange(2)}
                checked={ checked === 2 }
              />
              <span>M</span>
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Radio
                label=''
                { ...custom }
                error={ error }
                name={ name }
                onChange={() => rest.onChange(3)}
                checked={ checked === 3 }
              />
              <span>L</span>
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Radio
                label=''
                { ...custom }
                error={ error }
                name={ name }
                onChange={() => rest.onChange(4)}
                checked={ checked === 4 }
              />
              <span>XL</span>
            </Form.Field>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

export default CustomRadio