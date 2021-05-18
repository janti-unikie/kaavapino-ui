import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'hds-react'
import './styles.scss'

function DropdownFilter({ name, defaultValue, options, placeholder, onChange }) {

  const [currentValue, setCurrentValue] = useState()

  useEffect( () => {
    setCurrentValue( defaultValue )
  }, [defaultValue])

  return (
    <Select
      name={name}
      clearable={false}
      id={name}
      multiselect={true}
      options={options}
      onBlur={() => onChange( currentValue )}
      onChange={data => {
       setCurrentValue( data )
      }}
      className="filter-dropdown"
      placeholder={placeholder}
    />
  )
}

DropdownFilter.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array.isRequired,
  noResultsMessage: PropTypes.string
}

export default DropdownFilter
