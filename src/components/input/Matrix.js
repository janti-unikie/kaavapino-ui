import React from 'react'
import { connect } from 'react-redux'
import { checkingSelector } from '../../selectors/projectSelector'
import Field from './Field'
import projectUtils from '../../utils/projectUtils'

const Matrix = ({ field: { matrix: { rows, columns, fields } }, checking, attributeData }) => {
  const matrixStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns.length + 1}, minmax(auto, auto))`,
    gridTemplateRows: `repeat(${rows.length + 1}, minmax(auto, auto)`,
    columnGap: '10px',
    rowGap: '10px'
  }
  const matrix = []
  const col = Array(columns.length).fill(0)
  rows.forEach(() => matrix.push([ ...col ]))
  fields.forEach(({ row: x, column: y, ...rest }) => {
    matrix[x][y] = { ...rest }
  })
  return (
    <div className='matrix-container'>
      <div className='matrix' style={ matrixStyle }>
        <b />
        { columns.map((c, i) => <b key={`${c}-${i}`}> { c } </b>) }
        { matrix.map((row, y) => {
          return (
            <React.Fragment key={`${rows[y]}-${y}`}>
              { row.map((field, x) => {
                const highlighted = field !== 0 && checking && projectUtils.isFieldMissing(field.name, field.required, attributeData)
                return (
                  <span style={{ display: 'contents' }} key={`${field.name}-${y}-${x}`}>
                    {x === 0 && <b>{ rows[y] }</b>}
                    { field === 0 && <span /> }
                    { field !== 0 && (
                      <span className={`${highlighted ? 'highlighted' : ''}`}>
                        <b>{ field.label }</b>
                        <Field
                          attributeData={attributeData}
                          field={field}
                          fieldset={field.type === 'fieldset'}
                        />
                      </span>
                    )}
                  </span>
                )
              })}
            </React.Fragment>
          )}) }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  checking: checkingSelector(state)
})

export default connect(
  mapStateToProps
)(Matrix)