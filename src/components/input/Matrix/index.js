import React from 'react'
import { connect } from 'react-redux'
import { checkingSelector } from '../../../selectors/projectSelector'
import Field from '../Field'
import projectUtils from '../../../utils/projectUtils'
import './styles.scss'

const TOTAL_FIELD_TYPE = 'totalField'

const addTotalRowAndColumn = ({
  rows: dataRows,
  columns: dataColumns,
  fields: dataFields,
  valueEnding,
  ...rest
}) => {
  const rows = [...dataRows, 'Yhteensä']
  const columns = [...dataColumns, 'Yhteensä']
  const fields = [...dataFields]

  /* Handle dispalying e.g. k-m^2 properly by using sup for the number 2 */
  const valueEndingSplit = valueEnding.split('^')
  const valueHtmlElement = (
    <span>
      3000
      {valueEndingSplit[0]}
      <sup>{valueEndingSplit.length > 0 && valueEndingSplit[1]}</sup>
    </span>
  )

  for (let i = 0; i < dataRows.length; i += 1) {
    fields.push({
      type: TOTAL_FIELD_TYPE,
      value: valueHtmlElement,
      row: i,
      column: dataColumns.length
    })
  }
  for (let i = 0; i < dataColumns.length; i += 1) {
    fields.push({
      type: TOTAL_FIELD_TYPE,
      value: valueHtmlElement,
      row: dataRows.length,
      column: i
    })
  }
  fields.push({
    type: TOTAL_FIELD_TYPE,
    value: valueHtmlElement,
    row: dataRows.length,
    column: dataColumns.length
  })

  return {
    rows,
    columns,
    fields,
    ...rest
  }
}

const Matrix = ({ field: { matrix }, checking, attributeData }) => {
  console.log('yarrr', matrix)
  const { rows, columns, fields } =
    matrix && matrix.showTotals ? addTotalRowAndColumn(matrix) : matrix
  console.log(rows, columns, fields)
  const matrixStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns.length}, minmax(auto, auto))`,
    gridTemplateRows: `repeat(${rows.length}, minmax(auto, auto)`,
    columnGap: '20px',
    rowGap: '10px'
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
                  <>
                    <span style={{ display: 'contents' }} key={`${field.name}-${y}-${x}`}>
                      {/* {x === 0 && <b>{rows[y]}</b>} */}
                      {field === 0 && <span />}
                      {field && field.type === TOTAL_FIELD_TYPE && (
                        <span className="matrix-total-field">
                          <b className="matrix-total-field-label">{columns[x]}</b>
                          <div className="matrix-total-field-value">{field.value}</div>
                        </span>
                      )}
                      {field !== 0 && field.type !== TOTAL_FIELD_TYPE && (
                        <span className={`${highlighted ? 'highlighted' : ''}`}>
                          <b>{columns[x]}</b>
                          <Field
                            attributeData={attributeData}
                            field={field}
                            fieldset={field.type === 'fieldset'}
                          />
                        </span>
                      )}
                    </span>
                  </>
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
