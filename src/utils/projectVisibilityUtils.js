import { includes } from 'lodash'
// Field returns info whether field given as a parameter should be shown or not.
export const showField = (field, formValues) => {
  let returnValue = false

  if (field.hide_conditions && field.hide_conditions.length > 0) {
    const results = []
    field.hide_conditions.forEach(hideCondition => {
      const { variable } = hideCondition
      const { operator } = hideCondition
      const comparisonValue = hideCondition.comparison_value
      const comparisonValueType = hideCondition.comparison_value_type

      if (comparisonValueType === 'boolean') {
        const value = formValues[variable]

        let realValue = false

        if (value === true || value === false) {
          realValue = value
        } else {
          realValue = value !== undefined
        }

        if (operator === '==') {
          if (realValue === comparisonValue) {
            results.push(true)
          } else {
            results.push(false)
          }
        }
      }
    })
    const hasTrue = includes(results, true)

    if (!hasTrue) {
      returnValue = true
    }
  } else if (
    field &&
    field.visibility_conditions &&
    field.visibility_conditions.length > 0
  ) {
    field.visibility_conditions.forEach(visibilityCondition => {
      const { variable } = visibilityCondition
      const { operator } = visibilityCondition
      const comparisonValue = visibilityCondition.comparison_value
      const comparisonValueType = visibilityCondition.comparison_value_type

      if (comparisonValueType === 'list<string>') {
        if (comparisonValue.includes(formValues[variable])) {
          returnValue = true
          return
        }
      }

      if (comparisonValueType === 'boolean') {
        const value = formValues[variable]
        let realValue = false

        if (value === true || value === false) {
          realValue = value
        } else {
          realValue = value !== undefined
        }
        if (operator === '==' && comparisonValue === realValue) {
          returnValue = true
          return
        }
        if (operator === '!=' && comparisonValue !== realValue) {
          returnValue = true
          return
        }
      }
      if (comparisonValueType === 'string' || comparisonValueType === 'number') {
        if (operator === '==' && comparisonValue === formValues[variable]) {
          returnValue = true
          return
        }
        if (operator === '!=' && comparisonValue !== formValues[variable]) {
          returnValue = true
        }
      }
    })
  } else {
    returnValue = true
  }
  return returnValue
}
