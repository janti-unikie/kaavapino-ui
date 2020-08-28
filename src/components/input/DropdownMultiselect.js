import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox ,Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'

const DropdownMultiselect = ({ input, error, options, ...custom }) => {
  return (
    <Dropdown
      {...input}
      {...custom}
      fluid
      search
      selection
      clearable
      placeholder=""
      multiple
      noResultsMessage="Ei tuloksia"
      options={options}
      error={inputUtils.hasError(error)}
      onBlur={() => input.onBlur(input.value.value)}
      trigger={trigger(input.value, custom.custom.placeholder)}
    >
      <Dropdown.Menu>
        {options.map(({ key, text, value }) => {
          return(
            <Dropdown.Item key={key}>
              <Checkbox
                className='dropdown-checkbox'
                label={text}
                onChange={(param, data) => {
                  if (input.value.indexOf(data.label) !== -1) {
                    const nonSelectedValues = input.value.filter( opt => opt !== data.label )
                    input.onChange(nonSelectedValues)
                  } else {
                    input.onChange([...input.value, data.label])
                  }
                  }}
                checked={input.value.indexOf(text) !== -1}
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
  } else if (val.length === 1) {
    return <div>{val[0]}</div>
  } else {
    return <div>{`${val.length} valittu`}</div>
  }
}

DropdownMultiselect.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default DropdownMultiselect

