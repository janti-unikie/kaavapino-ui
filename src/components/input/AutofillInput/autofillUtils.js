const isOperator = calculationNode => ['+', '-'].indexOf(calculationNode) > -1
const isFieldName = calculationNode => !isOperator(calculationNode)

const calculateSingleOperation = (baseValue, operator, fieldName2, attributeData) => {
  const fieldVal2 = attributeData[fieldName2] || 0
  if (operator === '-') {
    return baseValue - fieldVal2
  } else {
    return baseValue + fieldVal2
  }
}

/* handles calculating autofill field value based on other fields.
 * the information is in the calculations attribute of a field */
export const handleAutofillCalculations = (calculations, formValues) => {
  if (!calculations || !calculations.length || !formValues) {
    return 0
  }

  /* Safety check: calculations should have an odd number of fields, where
   * every odd field is a fieldname, and every even field is an operator */
  if (calculations.length % 2 !== 1) {
    return 0
  }
  let value = 0
  /* if calculation length is 1, that field is the result */
  if (calculations.length === 1) {
    if (isFieldName(calculations[0])) {
      value = formValues[calculations[0]] || 0
    }
    return value
  }

  /* Start with the first value, then take the next operator and next field
   * on each rotation */
  let currentIndex = 0
  let accumulator = formValues[calculations[0]] || 0

  while (currentIndex < calculations.length) {
    const operator = calculations[currentIndex + 1]
    const nextFieldName = calculations[currentIndex + 2]
    accumulator = calculateSingleOperation(
      accumulator,
      operator,
      nextFieldName,
      formValues
    )

    currentIndex = currentIndex + 2
  }

  return accumulator
}
