import React, { useState } from 'react'
import './styles.scss'

const roles = ['Pääkäyttäjä', 'Asiantuntija']

const RoleHighlightPicker = ({ onRoleUpdate }) => {
  const [highlightedRole, setHighlightedRole] = useState(null)
  const handleOnClick = index => {
    if (highlightedRole === index) {
      setHighlightedRole(null)
      onRoleUpdate(null)
    } else {
      setHighlightedRole(index)
      onRoleUpdate(index)
    }
  }

  return (
    <div className="role-highlight-picker">
      <div className="magnifier-icon" />
      <div className="role-highlight-picker-right">
        <h4>Korosta täytettävät kentät</h4>
        <div className="role-buttons">
          {roles.map((role, i) => (
            <div
              key={i}
              onClick={() => handleOnClick(i)}
              className={`role-button ${i === highlightedRole ? 'active' : ''}`}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoleHighlightPicker
