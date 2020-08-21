import React from 'react'
import { connect } from 'react-redux'
import {
  updatesSelector,
  attributeDataSelector,
  checkingSelector
} from '../../selectors/projectSelector'
import { Segment } from 'semantic-ui-react'
import FormField from '../input/FormField'

const FormSection = ({
  section: { title, fields },
  checking,
  disabled,
  attributeData,
  updates
}) => {
  return (
    <Segment>
      <h2 id={`title-${title}`} className="section-title">
        {title}
      </h2>
      {fields.map((field, i) => (
        <FormField
          key={`${field.name}-${i}`}
          checking={checking}
          disabled={disabled}
          field={{ ...field, disabled: disabled || field.disabled }}
          attributeData={attributeData}
          updated={updates[field.name] || null}
        />
      ))}
    </Segment>
  )
}

const mapStateToProps = state => ({
  updates: updatesSelector(state),
  attributeData: attributeDataSelector(state),
  checking: checkingSelector(state)
})

export default connect(mapStateToProps)(FormSection)
