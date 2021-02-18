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

    setAutofillValue(getFieldAutofillValue(autofill_rule, formValues))

    if (formValues[name] === autoFillValue) {
      return
    }

    if (autoFillValue || isBoolean(autoFillValue) || isNumber( autoFillValue )) {
      dispatch(autofill(formName, name, autoFillValue))
    }
  }, [formValues, dispatch, autoFillValue])
  if ( autofill_rule && autofill_rule.length > 0 &&  autoFillValue === undefined ) {
    newFieldProps = {
      ...fieldProps,
      disabled: false
    }
  } else if (autofill_readonly || !editable ) {
    newFieldProps = {
      ...fieldProps,
      disabled: true
    }
  }

  return <Field {...newFieldProps} />
}

export default AutofillInput
