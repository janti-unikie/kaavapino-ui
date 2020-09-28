import React from 'react'
import { getFormValues, Field } from 'redux-form'
import { useSelector } from 'react-redux'
const RestrictedInput = ({
    field: { related_fields },
    fieldProps,
    formName
  }) => {
    const formValues = useSelector(getFormValues(formName))
    if ( formValues && formValues.length === 1 && !formValues[related_fields[0]]) {
      return null
    }

    return <Field {...fieldProps} />
  }

  export default RestrictedInput