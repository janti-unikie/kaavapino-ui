import React, { useEffect, useState } from 'react'
import { autofill, getFormValues, Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldAutofillValue } from '../../../utils/projectAutofillUtils'
import { isBoolean } from 'lodash'

const AutofillInput = ({
  field:{ name, autofill_readonly, autofill_rule },
  fieldProps,
  formName,
  saveAutofill
}) => {
  const formValues = useSelector(getFormValues(formName))
  const dispatch = useDispatch()

  let newFieldProps = fieldProps

  const [autoFillValue, setAutofillValue] = useState('')

  useEffect( () => {
    if (!formValues) {
      return
    }

    setAutofillValue(getFieldAutofillValue( autofill_rule, formValues ))

    if ( formValues[name] === autoFillValue ) {
      return
    }

    if ( isBoolean( autoFillValue )) {
       dispatch(autofill(formName, name, autoFillValue))
       saveAutofill()
    }
  }, [formValues, dispatch, autoFillValue])

  if ( autofill_readonly || isBoolean( autoFillValue )) {
    newFieldProps = {
      ...fieldProps,
      disabled: true
    }
  }

  return (
    <Field {...newFieldProps} />
  )
}

export default AutofillInput
