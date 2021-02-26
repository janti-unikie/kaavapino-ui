import React, { useEffect, useState } from 'react'
import { autofill, getFormValues, Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldAutofillValue } from '../../../utils/projectAutofillUtils'

const AutofillInput = ({
  field: { name, autofill_readonly, autofill_rule, editable },
  fieldProps,
  formName
}) => {
  const formValues = useSelector(getFormValues(formName))
  const dispatch = useDispatch()

  let newFieldProps = fieldProps

  const [autoFillValue, setAutofillValue] = useState('')

  useEffect(() => {
    if (!formValues) {
      return
    }
    if (formValues[name] === autoFillValue && formValues[name] !== undefined) {
      return
    }

    let currentValue = formValues[name]

    if (formValues[name] === undefined) {
      const lastIndex = name.lastIndexOf('.')
      const fieldSet = name.substring(0, lastIndex - 3)
      const value = name.substring(lastIndex + 1, name.length)
      const currentFieldSet = name.substring(lastIndex - 2, lastIndex - 1)
      if (formValues && formValues[fieldSet]) {
        currentValue = formValues[fieldSet][currentFieldSet][value]
      }
    }

    setAutofillValue(getFieldAutofillValue(autofill_rule, formValues, name))

    if (currentValue === autoFillValue) {
      return
    }

    if (autoFillValue !== undefined) {
      dispatch(autofill(formName, name, autoFillValue))
    }
  }, [formValues, dispatch, autoFillValue])
   if (!editable) {
    newFieldProps = {
      ...fieldProps,
      disabled: true
    }
  } else if (autofill_rule && autofill_rule.length > 0 && autoFillValue === undefined) {
    newFieldProps = {
      ...fieldProps,
      disabled: false
    }
  } else if (autofill_readonly) {
    newFieldProps = {
      ...fieldProps,
      disabled: true
    }
  }

  return <Field {...newFieldProps} />
}

export default AutofillInput
