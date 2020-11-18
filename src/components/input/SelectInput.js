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
      onChange={(param, data) => {

        let returnValue = data.value
        if ( returnValue === '' ) {
          returnValue = null
        }
        input.onChange(returnValue)
        if ( custom.handleSave ) {
          custom.handleSave(returnValue)
        }
        }
      }
      name={input.name}
      fluid
      search
      selection
      clearable
      placeholder=""
      noResultsMessage="Ei tuloksia"
      options={options}
      defaultValue={input.value}
      error={inputUtils.hasError(error)}
    />
  )
}

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectInput
