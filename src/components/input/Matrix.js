import React from 'react'
import Field from './Field'

const Matrix = ({ field: { matrix: { rows, columns, fields } }, checking, attributeData }) => {
  const matrixStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns.length + 1}, minmax(auto, auto))`,
    gridTemplateRows: `repeat(${rows.length + 1}, minmax(auto, auto)`,
    columnGap: '10px',
    rowGap: '10px'
  }

  return (
    <div className='matrix-container'>
      <div className='matrix' style={ matrixStyle }>
        <b />
        { columns.map((c, i) => <b key={i}> { c } </b>) }
        {
          fields.map((field, i) => {
            const highlighted = checking && field.required && !attributeData[field.name]
            const fieldStyle = highlighted ? { backgroundColor: 'yellow' } : {}
            if ((i % columns.length === 0)) {
              return (
                <span style={{ display: 'contents' }} key={i}>
                  <b>{ rows[i / columns.length] }</b>
                  <Field style={fieldStyle} field={field} />
                </span>
              )
            }
            return <Field style={fieldStyle} key={i} field={field} />
          })
        }
      </div>
    </div>
  )
}

export default Matrix