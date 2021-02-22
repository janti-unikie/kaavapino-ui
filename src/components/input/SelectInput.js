import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'
import DropdownMultiselect from './DropdownMultiselect'

const SelectInput = ({ input, meta: { error }, options, onBlur, placeholder, ...custom }) => {
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

        let returnValue = data.value
        if ( returnValue === '' ) {
          returnValue = null
        }
        input.onChange(returnValue)
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
      value={input.value}
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
