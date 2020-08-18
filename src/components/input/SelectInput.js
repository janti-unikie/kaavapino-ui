import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox ,Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'

const SelectInput = ({ input, meta: { error }, options, ...custom }) => {
  if (custom.multiple) {
    const trigger = (value) => {
      const val = value || []
      return <div>{val.length === 1 ? val[0] : `${val.length} valittu`}</div>
    }
    return (
      <Dropdown
        {...input}
        {...custom}
        fluid
        search
        clearable
        placeholder=""
        multiple
        selection
        options={options}
        noResultsMessage="Ei tuloksia"
        error={inputUtils.hasError(error)}
        onBlur={() => input.onBlur(input.value.value)}
        trigger={trigger(input.value)}
      >
        <Dropdown.Menu>
          {options.map(({ key, text }) => (
            <Dropdown.Item key={key}>
              <Checkbox label={text} onChange={(param, data) => {
                if (input.value.indexOf(data.label) !== -1) {
                  let nonSelectedValues = input.value.filter( opt => opt !== data.label )
                  input.onChange(nonSelectedValues)
                }
                input.onChange([...input.value, data.label])}}/>
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
