// Field returns info whether field given as a parameter should be shown or not.
export const getFieldAutofillValue = (autofill_rule, formValues) => {
  let returnValue

  if (autofill_rule && autofill_rule.length > 0) {
    autofill_rule.forEach(autofill => {
      const condition = autofill.condition
      const thenBranch = autofill.then_branch

      if (!condition || !thenBranch) {
        return ''
      }
      const variable = condition.variable
      const operator = condition.operator
      const comparisonValue = condition.comparison_value
      const comparisonValueType = condition.comparison_value_type

      if (comparisonValueType === 'list<string>') {
        if (comparisonValue.includes(formValues[variable])) {
          returnValue = thenBranch
          return
        }
      }

      if (comparisonValueType === 'string') {
        if (operator === '==' && comparisonValue === formValues[variable]) {
          returnValue = thenBranch
          return
        }
        if (operator === '!=' && comparisonValue !== formValues[variable]) {
          returnValue = thenBranch
          return
        }
      }

      if (comparisonValueType === 'boolean') {
        const realValue = formValues[variable] ? formValues[variable] === true : false

        if (operator === '==' && comparisonValue === realValue ) {
            returnValue = thenBranch === 'True' ? true : false
            return
        }

        if (operator === '!=' && comparisonValue !== realValue) {
            returnValue = thenBranch === 'True' ? true : false
            return
        }
        returnValue = false
        return
      }
      if (comparisonValueType === 'number' || comparisonValueType === 'string') {
        if (operator === '==' && comparisonValue === formValues[variable]) {
          returnValue = thenBranch
          return
        }
        if (operator === '!=' && comparisonValue !== formValues[variable]) {
          returnValue = thenBranch
          return
        }
      }

    })
  }
  return returnValue
}
