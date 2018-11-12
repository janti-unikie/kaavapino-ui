import React from 'react'
import Field from './Field'

const Matrix = ({ field: { matrix: { rows, columns, fields } } }) => {
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
        { fields.map((field, i) => {
          if ((i % columns.length === 0)) {
            return (
              <span style={{ display: 'contents' }} key={i}>
                <b>{ rows[i / columns.length] }</b>
                <Field field={field} />
              </span>
            )
          }
          return <Field key={i} field={field} />
        }) }
      </div>
    </div>
  )
}

export default Matrix