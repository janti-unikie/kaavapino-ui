import React from 'react'
import { connect } from 'react-redux'
import { checkingSelector } from '../../../selectors/projectSelector'
import Field from '../Field'
import projectUtils from '../../../utils/projectUtils'
import './styles.scss'

const TOTAL_FIELD_TYPE = 'totalField'

const Matrix = ({ field: { matrix }, checking, attributeData }) => {
  const { rows, columns, fields } = matrix

  const matrixStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns.length}, 1fr`,
    gridTemplateRows: `repeat(${rows.length}, minmax(auto, auto)`
  }
  const fieldMatrix = []
  const col = Array(columns.length).fill(0)
  rows.forEach(() => fieldMatrix.push([...col]))
  fields.forEach(({ row: x, column: y, ...rest }) => {
    fieldMatrix[x][y] = { ...rest }
  })
  return (
    <div className="matrix-container">
      <div className="matrix" style={matrixStyle}>
        {fieldMatrix.map((row, y) => {
          return (
            <React.Fragment key={`${rows[y]}-${y}`}>
              <span className="row-header" style={{ gridColumn: '1 / -1' }}>
                {rows[y]}
              </span>
              {row.map((field, x) => {
                const highlighted =
                  field !== 0 &&
                  checking &&
                  projectUtils.isFieldMissing(field.name, field.required, attributeData)
                return (
                  <React.Fragment key={`${field.name}-${y}-${x}-total`}>
                    <span style={{ display: 'contents' }}>
                      {field === 0 && <span />}
                      {field && field.type === TOTAL_FIELD_TYPE && (
                        <span className="matrix-total-field">
                          <b className="matrix-total-field-label">{columns[x]}</b>
                          <div className="matrix-total-field-value">{field.value}</div>
                        </span>
                      )}
                      {field !== 0 && field.type !== TOTAL_FIELD_TYPE && (
                        <span
                          className={`${highlighted ? 'highlighted' : ''}`}
                          key={`${field.name}-${y}-${x}`}
                        >
                          <b>{columns[x]}</b>
                          <Field
                            attributeData={attributeData}
                            field={field}
                            fieldset={field.type === 'fieldset'}
                          />
                        </span>
                      )}
                    </span>
                  </React.Fragment>
                )
              })}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  checking: checkingSelector(state)
})

export default connect(mapStateToProps)(Matrix)
