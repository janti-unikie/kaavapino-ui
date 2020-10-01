export const showField = (field, formValues) => {
  let returnValue = false

  if (field && field.visibility_conditions && field.visibility_conditions.length > 0) {

    field.visibility_conditions.forEach(visibilityCondition => {

      const variable = visibilityCondition.variable
      const operator = visibilityCondition.operator
      const comparisonValue = visibilityCondition.comparison_value
      const comparisonValueType = visibilityCondition.comparison_value_type

      console.log(field.label)

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
      }
    })
  } else {
    returnValue = true
  }
  return returnValue
}
