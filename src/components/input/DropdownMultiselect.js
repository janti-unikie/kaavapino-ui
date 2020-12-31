import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'

const DropdownMultiselect = ({ input, error, options, onBlur, placeholder, disabled }) => {
  return (
    <Dropdown
      className="selection"
      fluid
      search
      clearable
      placeholder={placeholder}
      multiple
      noResultsMessage="Ei tuloksia"
      error={inputUtils.hasError(error)}
      onBlur={onBlur}
      trigger={trigger(input.value, placeholder)}
      disabled={disabled}
    >
      <Dropdown.Menu>
        {options.map(({ key, text, value }) => {
          return (
            <Dropdown.Item key={key}>
              <Checkbox
                className="dropdown-checkbox"
                label={text}
                onChange={(param, data) => {
                  if (input.value.indexOf(data.value) !== -1) {
                    const nonSelectedValues = input.value.filter(
                      opt => opt !== data.value
                    )
                    input.onChange(nonSelectedValues)
                  } else {
                    input.onChange([...input.value, data.value])
                  }
                }}
                checked={input.value.indexOf(key) !== -1}
                value={value}
              />
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

const trigger = (value, placeholder) => {
  const val = value || []
  if (val.length === 0) {
    return <div className="placeholder">{placeholder}</div>
  }  else {
    return <div>{`${val.length} valittu`}</div>
  }
}

DropdownMultiselect.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default DropdownMultiselect
