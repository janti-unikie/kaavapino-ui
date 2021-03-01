import { includes } from 'lodash'
// Field returns info whether field given as a parameter should be shown or not.
export const showField = (field, formValues, currentName) => {
  let returnValue = false

  if (!field) {
    return true
  }

  const getValue = variable => {
    if (!formValues) {
      return null
    }
    let value = formValues[variable]

    const fieldNames = currentName && currentName.split('.')
    // Nested fieldsets are not supported
    if (!fieldNames || fieldNames.length > 2) {
      return value
    }

    const lastIndex = currentName ? currentName.lastIndexOf('.') : -1

    if (lastIndex !== -1) {
      const testChar = currentName.length > 3 && currentName[lastIndex - 4]
      let fieldSet
      let currentFieldSet

      // Support for fieldset bigger than 9.
      // Eg. if value is test[11] then substring one more
      if (testChar === '[') {
        fieldSet = currentName.substring(0, lastIndex - 4)
        // Get current fieldset number
        currentFieldSet = currentName.substring(lastIndex - 3, lastIndex - 1)
      } else {
        fieldSet = currentName.substring(0, lastIndex - 3)
        // Get current fieldset number
        currentFieldSet = currentName.substring(lastIndex - 2, lastIndex - 1)
      }

      let currentValue
      if (formValues && formValues[fieldSet] && formValues[fieldSet][currentFieldSet] ) {
        currentValue = formValues[fieldSet][currentFieldSet][variable]
      }

      value = !currentValue && currentValue !== false ? '' : currentValue
    }
    return value
  }

  if (field.hide_conditions && field.hide_conditions.length > 0) {
    const results = []
    field.hide_conditions.forEach(hideCondition => {
      const { variable } = hideCondition
      const { operator } = hideCondition
      const comparisonValue = hideCondition.comparison_value
      const comparisonValueType = hideCondition.comparison_value_type

      if (comparisonValueType === 'boolean') {
        let value = getValue(variable)

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
        if (comparisonValue.includes(getValue(variable))) {
          returnValue = true
          return
        }
      }

      if (comparisonValueType === 'boolean') {
        const value = getValue(variable)
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
        if (operator === '==' && comparisonValue === getValue(variable)) {
          returnValue = true
          return
        }
        if (comparisonValueType === 'number') {
          let value = getValue(variable)
          if (!value) {
            value = 0
          }

          if (operator === '!=' && comparisonValue !== +value) {
            returnValue = true
          }
        } else {
          if (operator === '!=' && comparisonValue !== getValue(variable)) {
            returnValue = true
          }
        }
      }
    })
  } else {
    returnValue = true
  }
  return returnValue
}
