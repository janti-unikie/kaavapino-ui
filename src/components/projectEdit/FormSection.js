import React from 'react'
import Field from '../input/Field'
import Matrix from '../input/Matrix'

const FormSection = ({ section: { title, fields } }) => {
  return (
    <div>
      <span id={`title-${title}`} className='form-title'>{ title }</span>
      <hr />
      { fields.map((field, i) => {
        return (
          <div className='input-container' key={i}>
            <div className='input-header'>
              <span className='input-title'>{ field.label }</span>
            </div>
            { field.type === 'matrix' && <Matrix field={field} /> }
            { field.type !== 'matrix' && <Field field={field} /> }
          </div>
        )
      }) }
    </div>
  )
}

export default FormSection