import React from 'react'
import { getFormValues, Field, change } from 'redux-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const AutofillInput = ({
    field: { name, autofill_rule } ,
    fieldProps,
    formName
  }) => {
    const formValues = useSelector(getFormValues(formName))

    const dispatch = useDispatch()
   // const dispatch = useDispatch()

    const getAutoFillValue = () => {
      autofill_rule.forEach( autoFill => {

        const condition = autoFill.condition
        const comparisonValue = condition.comparison_value
      //  const comparisonValueType = condition.comparison_value_type
        const operator = condition.operator
        const variable = condition.variable

        const variableValue = formValues[variable]
        if ( operator === '==') {

          if( comparisonValue === variableValue ) {

            return autoFill.then_branch
          }
        }

      })
      return null
    }
    const autoFillValue = getAutoFillValue()
    console.log(autoFillValue)
    if ( autoFillValue ) {
      console.log(name)
      dispatch(change(formName, name, autoFillValue))
    }

    return <Field {...fieldProps} />
}

export default AutofillInput