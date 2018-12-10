import React from 'react'
import { connect } from 'react-redux'
import { checkingSelector } from '../../selectors/projectSelector'
import Field from './Field'
import { Form, Button } from 'semantic-ui-react'
import projectUtils from '../../utils/projectUtils'

const FieldSet = ({ sets, fields, checking, attributeData, name }) => (
  <React.Fragment>
    { sets.map((set, i) => {
      return (
        <div key={i} className='fieldset-container'>
          { fields.map((field, j) => {
            let required = false
            if (checking && !(!attributeData[name] || !attributeData[name][i])) {
              if (checking && projectUtils.isFieldMissing(field.name, field.required, attributeData[name][i])) {
                required = true
              }
            } else if (checking && field.required) {
              required = true
            }
            return (
              <div className='input-container' key={j}>
                <div className='input-header'>
                  <Form.Field required={ required }>
                    <label className={`input-title${required ? ' highlight': ''}`}>{ field.label }</label>
                  </Form.Field>
                </div>
                <Field
                  field={{ ...field, name: `${set}.${field.name}` }}
                  attributeData={attributeData}
                  fieldset={field.type === 'fieldset'}
                />
              </div>
            )
          }) }
        </div>
      )}) }
    <Button onClick={() => sets.push({})}>+</Button>
    <Button disabled={sets.length < 1} onClick={() => sets.remove(sets.length - 1)}>-</Button>
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  checking: checkingSelector(state)
})

export default connect(
  mapStateToProps
)(FieldSet)