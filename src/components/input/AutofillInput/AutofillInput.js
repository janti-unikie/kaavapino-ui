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

  let newFieldProps = { ...fieldProps }

  if ( autofill_readonly ) {
    newFieldProps = {
      ...newFieldProps,
      disabled: true
    }
  }
  return (
      <Field {...newFieldProps} />
    )
}

export default AutofillInput
