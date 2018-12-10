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

  return (
    <div className='matrix-container'>
      <div className='matrix' style={ matrixStyle }>
        <b />
        { columns.map((c, i) => <b key={i}> { c } </b>) }
        {
          fields.map((field, i) => {
            console.log('attributeData', attributeData)
            const highlighted = checking && projectUtils.isFieldMissing(field.name, field.required, attributeData)
            console.log('h', highlighted)
            if ((i % columns.length === 0)) {
              return (
                <span style={{ display: 'contents' }} key={i}>
                  <b>{ rows[i / columns.length] }</b>
                  <span className={`${highlighted ? 'highlighted' : ''}`}>
                    <Field
                      attributeData={attributeData}
                      field={field}
                    />
                  </span>
                </span>
              )
            }
            return (
              <span className={`${highlighted ? 'highlighted' : ''}`} key={i}>
                <Field
                  attributeData={attributeData}
                  field={field}
                />
              </span>
            )
          })
        }
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