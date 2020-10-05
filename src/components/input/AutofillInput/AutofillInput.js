import React, { useEffect } from 'react'
import { change, getFormValues, Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldAutofillValue } from '../../../utils/projectAutofillUtils'

const AutofillInput = ({
  field:{ name, autofill_readonly, autofill_rule },
  fieldProps,
  formName
}) => {
  const formValues = useSelector(getFormValues(formName))
  const dispatch = useDispatch()
  const value = (formValues && formValues[name]) || null

  useEffect(() => {
    if (!formValues) {
      return
    }
    const autoFillValue = getFieldAutofillValue( autofill_rule, formValues )

    if ( formValues[name] === autoFillValue ) {
      return
    }
    if ( autoFillValue ) {
      dispatch(change(formName, name, autoFillValue))
    }
  }, [formValues])
  return (
    <div className="autofill-input">
    {autofill_readonly ? (
      <div className="autofill-readonly-input">
        <div className="autofill-readonly-input-value">
          {value}
        </div>
      </div>
    ) : (
      <Field {...fieldProps} />
    )}
  </div>

  )
}

export default AutofillInput
