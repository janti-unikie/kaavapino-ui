import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'
import ControlledDropdown from './ControlledDropdown'

const SelectInput = ({ input, meta: { error }, options, ...custom }) => {
  if (custom.multiple) {
    return (
      <ControlledDropdown
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
      onChange={(param, data) => input.onChange(data.value)}
      fluid
      search
      selection
      clearable
      placeholder=""
      noResultsMessage="Ei tuloksia"
      options={options}
      error={inputUtils.hasError(error)}
      onBlur={() => input.onBlur(input.value.value)}
    />
)
}

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectInput

