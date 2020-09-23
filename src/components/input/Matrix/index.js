import React from 'react'
import { connect } from 'react-redux'
import { checkingSelector } from '../../../selectors/projectSelector'
import Field from '../Field'
import projectUtils from '../../../utils/projectUtils'
import './styles.scss'
import Info from '../../../components/input/Info'

const Matrix = ({ field: { matrix }, checking, attributeData, formName }) => {
  const { rows, columns, fields } = matrix

  const columnCount = columns.length
  const rowCount = rows.length

  const matrixStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnCount}, 1fr`,
    gridTemplateRows: `repeat(${rowCount}, minmax(auto, auto)`
  }

  const fieldMatrix = []
  const col = Array(columnCount).fill(0)
  rows.forEach(() => fieldMatrix.push([...col]))
  fields.forEach(({ row: x, column: y, ...rest }) => {
    fieldMatrix[x][y] = { ...rest }
  })

  const renderInfo = field => {
    return <Info content={field.help_text} link={field.help_link} />
  }

  return (
    <div className="matrix-container">
      <div className="matrix" style={matrixStyle}>
        {fieldMatrix.map((row, y) => {
          return (
            <React.Fragment key={`${rows[y]}-${y}`}>
            {rows[y] && (
              <span className="row-header" style={{ gridColumn: '1 / -1' }}>
                {rows[y]}
              </span>
              )}
              {row.map((field, x) => {
                const highlighted =
                  field !== 0 &&
                  checking &&
                  projectUtils.isFieldMissing(field.name, field.required, attributeData)
                return (
                  <React.Fragment key={`${field.name}-${y}-${x}-total`}>
                    <span style={{ display: 'contents' }}>
                      {field === 0 ? (
                        <span />
                      ) : (
                        <span
                          className={`${highlighted ? 'highlighted' : ''}`}
                          key={`${field.name}-${y}-${x}`}
                        >
                          <div className="input-header">
                            <div className="input-title" >{columns[x]}</div>
                            <div className="input-header-icons">
                              {renderInfo(field)}
                            </div>
                        </div>
                          <Field
                            attributeData={attributeData}
                            field={field}
                            fieldset={field.type === 'fieldset'}
                            formName={formName}
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
