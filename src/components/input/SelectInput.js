import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'
import DropdownMultiselect from './DropdownMultiselect'

const SelectInput = ({ input, meta: { error }, options, onBlur, placeholder, ...custom }) => {

  const [value, setValue] = useState('')

  if (custom.multiple) {
    return (
      <DropdownMultiselect
        input={input}
        error={error}
        options={options}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={custom.disabled}
      />
    )
  }
  return (
    <Dropdown
      onChange={(param, data) => {

        setValue(data.value)
        input.onChange(data.value)
        if ( custom.handleSave ) {
          custom.handleSave()
        }
        }
      }
      name={input.name}
      fluid
      search
      selection
      clearable
      placeholder={placeholder}
      noResultsMessage="Ei tuloksia"
      options={options}
      value={input.value !== value ? input.value : value}
      disabled={custom.disabled}
      error={inputUtils.hasError(error)}
    />
  )
}

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectInput
