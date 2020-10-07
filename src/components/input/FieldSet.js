import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { checkingSelector } from '../../selectors/projectSelector'
import Field from './Field'
import { Form, Button } from 'semantic-ui-react'
import projectUtils from '../../utils/projectUtils'

const FieldSet = ({ sets, fields, checking, attributeData, name, disabled, formName }) => {
  let numberOfSets = 1
  if (attributeData[sets.name]) {
    if (sets.length !== attributeData[sets.name].length) {
      numberOfSets = sets.length - attributeData[sets.name].length+1
    }
  }
  return (
    <React.Fragment>
      {sets.map((set, i) => {
        if (i < numberOfSets){
          return (
            <React.Fragment key={`${name}-${i}`}>
              <div key={i} className="fieldset-container">
                <div className="fieldset-header">
                  <h3 className="fieldset-header-number">{i + 1}.</h3>
                  <FontAwesomeIcon
                    className="fieldset-remove"
                    icon="times"
                    color="red"
                    size="lg"
                    onClick={() => sets.remove(i)}
                  />
                </div>
                {fields.map((field, j) => {
                  let required = false
                  if (checking && !(!attributeData[name] || !attributeData[name][i])) {
                    if (
                      checking &&
                      projectUtils.isFieldMissing(
                        field.name,
                        field.required,
                        attributeData[name][i]
                      )
                    ) {
                      required = true
                    }
                  } else if (checking && field.required) {
                    required = true
                  }
                  const defaultValue = projectUtils.getDefaultValue(name, attributeData, field.name)
                  return (
                    <div className="input-container" key={j}>
                      <div className="input-header">
                        <Form.Field required={required}>
                          <label className={`input-title${required ? ' highlight' : ''}`}>
                            {field.label}
                          </label>
                        </Form.Field>
                      </div>
                      <Field
                        field={{ ...field, disabled }}
                        attributeData={attributeData}
                        fieldset={field.type === 'fieldset'}
                        parentName={name}
                        formName={formName}
                        defaultValue={defaultValue}
                      />
                    </div>
                  )
                })}
              </div>
            </React.Fragment>
          )
        } else {
          return undefined
        }
      })}
      <Button className="fieldset-button-add" onClick={() => sets.push({})}>
        Lisää
      </Button>
      <Button
        className="fieldset-button-remove"
        disabled={sets.length < 1}
        onClick={() => sets.remove(sets.length - 1)}
      >
        Poista
      </Button>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  checking: checkingSelector(state)
})

export default connect(mapStateToProps)(FieldSet)
