import React, { useEffect, useState } from 'react'
import { isEqual } from 'lodash'
import { change, getFormValues, Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { handleAutofillCalculations } from './autofillCalculationsUtils'

/* This component should calculate and update it's value in redux form whenever
 * the related fields change.
 *
 * It attempts to not do needless redux form changes. However, it can be rather
 * performance-heavy. If performance becomes a problem, I recommend either
 * 1) throttling these changes: only after the user has stopped typing make all these
 * calls
 * 2) reverse the logic: currently the field knows which fields it listens to (in related_fields).
 * If instead the field would know which fields to update, all of those could be do at once e.g. on blur
 * instead of change listeners
 */

const AutofillReadonlyInput = ({
  field: { autofill_readonly, name, related_fields, calculations, unit },
  fieldProps,
  formName
}) => {
  const dispatch = useDispatch()
  const [previousRelatedFieldValues, setPreviousRelatedFieldValues] = useState([])
  const formValues = useSelector(getFormValues(formName))
  const value = (formValues && formValues[name]) || null

  useEffect(() => {
    if (!formValues) {
      return
    }

    /* Optimization: don't recalculate if related form values have not changed */
    let shouldRecalculate = false
    for (let i = 0; i < related_fields.length; i += 1) {
      if (!isEqual(formValues[related_fields[i]], previousRelatedFieldValues[i])) {
        shouldRecalculate = true
        break
      }
    }
    if (!shouldRecalculate) {
      return
    }
    setPreviousRelatedFieldValues(
      related_fields.map(relatedField => formValues[relatedField])
    )
    /* end of optimization */

    const calculatedTotal = handleAutofillCalculations(calculations, formValues)

    if (calculatedTotal !== value) {
      dispatch(change(formName, name, calculatedTotal))
    }
  }, [related_fields, formValues])
  return (
    <div className="autofill-input">
      {autofill_readonly ? (
        <div className="autofill-readonly-input">
          <div className="autofill-readonly-input-value">
            {`${value || 0}${value && unit ? ` ${unit}` : ''}`}
          </div>
        </div>
      ) : (
        <Field {...fieldProps} />
      )}
    </div>
  )
}

export default AutofillReadonlyInput
