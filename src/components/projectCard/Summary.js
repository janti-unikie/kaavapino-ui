import React from 'react'
import Geometry from '../input/Geometry'
import projectUtils from '../../utils/projectUtils'

const Summary = ({ attributeData, users }) => {
  const formatAttributeValue = ({ type, value, empty, fieldset_attributes, choices }) => {
    if (empty) {
      return <p>-</p>
    }
    if (type === 'boolean') {
      return <p>{value ? 'Kyllä' : 'Ei'}</p>
    } else if (type === 'fieldset') {
      return (
        <div className="fieldset-summary-container">
          {value.map((set, i) => (
            <React.Fragment key={i}>
              <b>{i + 1}.</b>
              {Object.keys(set).map((name, j) => {
                const attribute = fieldset_attributes.find(f => f.name === name)
                return (
                  <div className="fieldset-summary-item" key={j}>
                    <span className="fieldset-label">{attribute.label}</span>
                    {formatAttributeValue({ value: set[name], ...attribute })}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      )
    } else if (type === 'matrix') {
      return <p>Ei tuettu</p>
    } else if (type === 'geometry') {
      return <Geometry disabled input={{ value }} />
    } else if (type === 'user') {
      return <p>{projectUtils.formatUsersName(users.find(u => u.id === value))}</p>
    } else if (choices) {
      const c = choices.find(c => c.value === value)
      if (c) return <p>{c.label}</p>
    } else if (typeof value === 'object') {
      return <p>-</p>
    }

    return <p>{value}</p>
  }
  return (
    <div className="summary">
      {attributeData.map(({ label, ...rest }) => {
        return (
          <div className="summary-item-container" key={label}>
            <b>{label}</b>
            {formatAttributeValue(rest)}
          </div>
        )
      })}
    </div>
  )
}

export default Summary
