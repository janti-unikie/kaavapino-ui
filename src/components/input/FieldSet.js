import React from 'react'
import { connect } from 'react-redux'
import { checkingSelector } from '../../selectors/projectSelector'
import CustomField from './CustomField'
import { Form, Button, Label, Popup } from 'semantic-ui-react'
import projectUtils from '../../utils/projectUtils'
import Info from './Info'
import { showField } from '../../utils/projectVisibilityUtils'
import { has } from 'lodash'
import { IconCross, IconClock } from 'hds-react'

const FieldSet = ({
  sets,
  fields,
  checking,
  attributeData,
  name,
  disabled,
  formName,
  formValues,
  validate,
  syncronousErrors,
  handleSave,
  onRadioChange,
  updated
}) => {
  const handleBlurSave = () => {
    setTimeout(function () {
      handleSave()
    }, 500)
  }

  let requiredError = false
  if (fields) {
    fields.forEach(field => {
      if (attributeData[name]) {
        attributeData[name].forEach(attribute => {
          if (
            checking &&
            projectUtils.isFieldMissing(field.name, field.required, attribute)
          ) {
            requiredError = true
          }
        })
      } else {
        if (
          checking &&
          projectUtils.isFieldMissing(field.name, field.required, attributeData)
        ) {
          requiredError = true
        }
      }
    })
  }
  return (
    <React.Fragment>
      {sets.map((set, i) => {
        return (
          <React.Fragment key={`${name}-${i}`}>
            <div key={i} className="fieldset-container">
              <div className="fieldset-header">
                <h3 className="fieldset-header-number">{i + 1}.</h3>

                <IconCross
                  className="fieldset-remove"
                  color="red"
                  size="l"
                  onClick={() => sets.remove(i)} />
              </div>
              {fields.map((field, j) => {
                const currentName = `${set}.${field.name}`

                if (!showField(field, formValues, currentName) || !field.fieldset_index) {
                  return null
                }

                let required = false

                const isReadOnly = field && field.autofill_readonly
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

                const title = field.character_limit
                  ? `${field.label}  (Max ${field.character_limit} merkkiä)`
                  : field.label
                const error = syncronousErrors && syncronousErrors[field.name]

                /* Two ways to bring errors to FormField component:
                 * 1) the missing attribute data of required fields is checked automatically.
                 * 2) error text can be given directly to the component as props.
                 * Redux form gives error information to the Field component, but that's further down the line, and we need that information
                 * here to modify the input header accordingly. */
                const showError = required ? 'pakollinen kenttä' : error

                const fieldUpdated =
                  updated && updated.new_value && has(updated.new_value[0], field.name)
                return (
                  <div className={`input-container ${showError ? 'error' : ''}`} key={j}>
                    <Form.Field required={required}>
                      <div className="input-header">
                        <Label
                          className={`input-title${required ? ' highlight' : ''} ${
                            showError ? 'error' : ''
                          }`}
                        >
                          {title}
                        </Label>
                        <div className="input-header-icons">
                          {fieldUpdated && !isReadOnly && (
                            <Popup
                              trigger={<IconClock />}
                              inverted
                              on="hover"
                              position="top center"
                              hideOnScroll
                              content={
                                (
                                <span className="input-history">
                                  <span>{`${projectUtils.formatDate(
                                    updated.timestamp
                                  )} ${projectUtils.formatTime(updated.timestamp)} ${
                                    updated.user_name
                                  }`}</span>
                                </span>
                                )
                              }
                            />
                          )}
                          {field.help_text && (
                            <Info content={field.help_text} link={field.help_link} />
                          )}
                        </div>
                      </div>
                      <CustomField
                        field={{ ...field, name: currentName, disabled }}
                        attributeData={attributeData}
                        fieldset={field.type === 'fieldset'}
                        parentName={name}
                        formName={formName}
                        formValues={formValues}
                        handleSave={handleSave}
                        onRadioChange={onRadioChange}
                        onBlur={handleBlurSave}
                        validate={validate}
                      />
                      {showError && <div className="error-text">{showError}</div>}
                    </Form.Field>
                  </div>
                )
              })}
            </div>
          </React.Fragment>
        )
      })}
      <Button
        className={`fieldset-button-add ${
          requiredError ? 'fieldset-internal-error' : null
        }`}
        onClick={
          () => {
            sets.push({})
            }}
        disabled={disabled}
      >
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
