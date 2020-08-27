import React from 'react'
import { connect } from 'react-redux'
import { checkingSelector } from '../../../selectors/projectSelector'
import Field from '../Field'
import projectUtils from '../../../utils/projectUtils'
import './styles.scss'

const TOTAL_FIELD_TYPE = 'totalField'

/* Adds a total column at the right end of a matrix field and a total row at the bottom of it */
const addTotalFields = (
  { rows: dataRows, columns: dataColumns, fields: dataFields, ...rest },
  attributeData
) => {
  const rows = [...dataRows, 'Yhteensä']
  const columns = [...dataColumns, 'Yhteensä']

  /* The unit information is in the fields, but all should be of the same unit */
  const unit = dataFields && dataFields.length > 0 && dataFields[0].unit

  /* Make a total field for each row */
  const rowTotalFields = rows.map((row, i) => {
    const rowFields = dataFields.filter(field => field.row === i)
    const rowTotal = rowFields.reduce((total, current) => {
      const val = (attributeData && attributeData[current.name]) || 0
      return val ? total + val : total
    }, 0)
    const rowTotalField = {
      type: TOTAL_FIELD_TYPE,
      value: rowTotal ? `${rowTotal} ${unit}` : 0,
      row: i,
      column: dataColumns.length
    }
    return rowTotalField
  })

  /* Make a total field for each column */
  const columnTotalFields = columns.map((col, i) => {
    const colFields = dataFields.filter(field => field.column === i)
    const colTotal = colFields.reduce((total, current) => {
      const val = (attributeData && attributeData[current.name]) || 0
      return val ? total + val : total
    }, 0)
    const columnTotalField = {
      type: TOTAL_FIELD_TYPE,
      value: colTotal ? `${colTotal} ${unit}` : 0,
      row: dataRows.length,
      column: i
    }
    return columnTotalField
  })

  /* Make a total of all fields to the right bottom spot */
  const allTotalValue = dataFields.reduce((total, current) => {
    const val = (attributeData && attributeData[current.name]) || 0
    return val ? total + val : total
  }, 0)
  const allTotalField = {
    type: TOTAL_FIELD_TYPE,
    value: allTotalValue ? `${allTotalValue} ${unit}` : 0,
    row: dataRows.length,
    column: dataColumns.length
  }

  const fields = [...dataFields, ...columnTotalFields, ...rowTotalFields, allTotalField]

  return {
    rows,
    columns,
    fields,
    ...rest
  }
}

const Matrix = ({ field: { matrix }, checking, attributeData }) => {
  const { rows, columns, fields } = matrix
    ? addTotalFields(matrix, attributeData)
    : matrix

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
                      {/* {x === 0 && <b>{rows[y]}</b>} */}
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
