import React, { useEffect, useState } from 'react'
import { autofill, getFormValues, Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldAutofillValue } from '../../../utils/projectAutofillUtils'
import { isBoolean, isNumber } from 'lodash'

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

    // If value cannot be found from root (eg. it is under fieldset some modifications needs
    // need to be done. Name is eg. "something_fieldset[0].somefield". Since values are stored to redux as a
    // object, correct value needs to be found by substring the values from original field name
    // Now this supports only max 9 fieldsets and do not support nested fieldsets.
    // If nested fieldsets support is needed, recursive function needs to be done.
    if (formValues[name] === undefined) {
      const lastIndex = name.lastIndexOf('.')

      // Remove "[0]" from name to get fieldset name
      const fieldSet = name.substring(0, lastIndex - 3)
      // To get field value
      const value = name.substring(lastIndex + 1, name.length)
      // Get current fieldset number
      const currentFieldSet = name.substring(lastIndex - 2, lastIndex - 1)
      if (formValues && formValues[fieldSet]) {
        currentValue = formValues[fieldSet][currentFieldSet][value]
      }
    }

    setAutofillValue(getFieldAutofillValue(autofill_rule, formValues, name))

    if (currentValue === autoFillValue) {
      return
    }

    if (autoFillValue || isBoolean(autoFillValue) || isNumber( autoFillValue )) {
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
