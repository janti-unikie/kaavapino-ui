import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'
import DropdownMultiselect from './DropdownMultiselect'

const SelectInput = ({ input, meta: { error }, options, ...custom }) => {
  if (custom.multiple) {
    return (
      <DropdownMultiselect
        input={input}
        error={error}
        options={options}
        custom={custom}
      />
    )
  }

  return (
    <Dropdown
      {...input}
      {...custom}
      onChange={(param, data) => {
        input.onChange(data.value)
        if ( data.value && custom.handleSave) {
          custom.handleSave(data.value)
        }
        }
      }
      fluid
      search
      selection
      clearable
      placeholder=""
      noResultsMessage="Ei tuloksia"
      options={options}
      error={inputUtils.hasError(error)}
      value={input.value}
    />
  )
}

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectInput
