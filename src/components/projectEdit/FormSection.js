import React from 'react'
import { connect } from 'react-redux'
import { updatesSelector, attributeDataSelector, checkingSelector } from '../../selectors/projectSelector'
import { Divider } from 'semantic-ui-react'
import FormField from './FormField'

const FormSection = ({ section: { title, fields }, checking, attributeData, updates }) => {
  return (
    <div>
      <span id={`title-${title}`} className='form-title'>{ title }</span>
      <Divider />
      { fields.map((field, i) => (
        <FormField
          key={i}
          checking={checking}
          field={field}
          attributeData={attributeData}
          updated={updates[field.name] || null}
        />
      )) }
    </div>
  )
}

const mapStateToProps = (state) => ({
  updates: updatesSelector(state),
  attributeData: attributeDataSelector(state),
  checking: checkingSelector(state)
})

export default connect(
  mapStateToProps
)(FormSection)
