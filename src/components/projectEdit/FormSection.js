import React from 'react'
import { connect } from 'react-redux'
import {
  updatesSelector,
  attributeDataSelector,
  checkingSelector
} from '../../selectors/projectSelector'
import { Segment } from 'semantic-ui-react'
import FormField from '../input/FormField'
import { getFormValues } from 'redux-form'
import { EDIT_PROJECT_FORM } from '../../constants'

const FormSection = ({
  section: { title, fields },
  checking,
  disabled,
  attributeData,
  updates,
  handleSave,
  formName,
  formValues
}) => {
  const handleBlurSave = (evt, handleSave) => {
    if (evt) {
      setTimeout(function () {
        handleSave()
      }, 200)
    }
  }
  return (
    <Segment>
      <h2 id={`title-${title}`} className="section-title">
        {title}
      </h2>
      {fields.map((field, i) => (
        <FormField
          key={`${field.name}-${i}`}
          checking={checking}
          disabled={disabled}
          field={{ ...field, disabled: disabled || field.disabled }}
          attributeData={attributeData}
          updated={updates[field.name] || null}
          handleSave={handleSave}
          onBlur={e => {
            handleBlurSave(e, handleSave)
          }}
          onRadioChange={handleSave}
          formName={formName}
          formValues={formValues}
          className={field.highlight_group}
        />
      ))}
    </Segment>
  )
}

const mapStateToProps = state => ({
  updates: updatesSelector(state),
  attributeData: attributeDataSelector(state),
  checking: checkingSelector(state),
  formValues: getFormValues(EDIT_PROJECT_FORM)(state)
})

export default connect(mapStateToProps)(FormSection)
