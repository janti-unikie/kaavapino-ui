import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox ,Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'

const SelectInput = ({ input, meta: { error }, options, ...custom }) => {
  if (custom.multiple) {
    return (
      <Dropdown
        {...input}
        {...custom}
        //onChange={(param, data) => input.onChange(data.value)}
        fluid
        search
        clearable
        placeholder=""
        multiple
        selection
        noResultsMessage="Ei tuloksia"
        error={inputUtils.hasError(error)}
        onBlur={() => input.onBlur(input.value.value)}
      >
        <Dropdown.Menu>
          {options.map(({ key, text }) => (
            <Dropdown.Item key={key}>
              <Checkbox label={text} onChange={(param, data) => input.onChange([data.label])}/>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
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
