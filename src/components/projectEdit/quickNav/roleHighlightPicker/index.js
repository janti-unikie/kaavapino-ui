import React, { useState } from 'react'
import './styles.scss'

const roles = ['Ylläpitäjä', 'Asiantuntija']

const RoleHighlightPicker = () => {
  const [highlightedRole, setHighlightedRole] = useState(null)

  return (
    <div className="role-highlight-picker">
      <div className="magnifier-icon" />
      <div className="role-highlight-picker-right">
        <h3>Korosta täytettävät kentät</h3>
        <div className="role-buttons">
          {roles.map((role, i) => (
            <div
              key={i}
              onClick={() => setHighlightedRole(i)}
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
