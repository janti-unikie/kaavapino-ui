/* Field returns info whether field given as a parameter should be shown or not.
*
*  Autofill_rule has variables property which is meant to add a value from form to
*  rule. Now it is only implemented if type is boolean and expected return value is string.
*  Eq. "Kaavan nimi"-rule which has project name at the beginning and "asemakaava" or "asemakaava ja asemakaavan muuttaminen"
*/
export const getFieldAutofillValue = (autofill_rule, formValues) => {
  let returnValue
  let projectNameAdded = false

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
      const extraVariables = autofill.variables

       // Now only one variable is expected
      let formExtraValue = extraVariables ? formValues[extraVariables[0]] : ''

      if ( !formExtraValue ) {
        formExtraValue = ''
      }

       // List rule
      if (comparisonValueType === 'list<string>') {
        if (comparisonValue.includes(formValues[variable])) {
          returnValue = thenBranch
          return
        }
      }
      // String
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
          if ( thenBranch === 'True' ) {
            returnValue = true
            return
          } else if (thenBranch === 'False ') {
            returnValue = false
            return
          } else {
            if (returnValue) {
              if ( formExtraValue && !projectNameAdded ) {
               returnValue = `${formExtraValue} ${returnValue} ${thenBranch}`
               projectNameAdded = true
              } else {
                returnValue = `${returnValue} ${thenBranch}`
              }
            } else {
              if ( !projectNameAdded ) {
                returnValue = `${formExtraValue} ${thenBranch}`
                projectNameAdded = true
              } else {
                returnValue = thenBranch
              }
            }
          }
        } else {
          if ( extraVariables && !projectNameAdded ) {
            returnValue = formExtraValue
            projectNameAdded = true
          }
        }
        if (operator === '!=' && comparisonValue !== realValue) {
          if ( thenBranch === 'True') {
            returnValue = true
            return
           } else if (thenBranch === 'False') {
              returnValue = false
              return
          } else {
            if (returnValue) {
              returnValue = `${returnValue} ${thenBranch}`
            } else {
              returnValue = thenBranch
            }
          }
        }
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
