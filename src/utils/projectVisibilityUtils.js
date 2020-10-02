// Field returns info whether field given as a parameter should be shown or not.
export const showField = (field, formValues) => {
  let returnValue = false

  if (field && field.visibility_conditions && field.visibility_conditions.length > 0) {

    field.visibility_conditions.forEach(visibilityCondition => {

      const variable = visibilityCondition.variable
      const operator = visibilityCondition.operator
      const comparisonValue = visibilityCondition.comparison_value
      const comparisonValueType = visibilityCondition.comparison_value_type

      if (comparisonValueType === 'boolean') {
        const comparisonValueModified = comparisonValue === 'True' ? true : false
        const realValue = formValues[variable] ? formValues[variable] : false
        if (operator === '==' && comparisonValueModified === realValue) {
          returnValue = true
          return
        }
        if (operator === '!=' &&  comparisonValueModified !== realValue) {
          returnValue = true
          return
        }
      } else
      if (comparisonValueType === 'string') {
        if (operator === '==' && comparisonValue === formValues[variable]) {
          returnValue = true
          return
        } else
        if (operator === '!=' &&  comparisonValue !== formValues[variable]) {
          returnValue = true
          return
        }
      } else
      if (comparisonValueType === 'number') {
        if (operator === '==' && parseInt(comparisonValue) === formValues[variable]) {
          returnValue = true
          return
        }
        if (operator === '!=' &&  parseInt(comparisonValue) !== formValues[variable]) {
          returnValue = true
          return
        }
      }
    })
  } else {
    returnValue = true
  }
  return returnValue
}
