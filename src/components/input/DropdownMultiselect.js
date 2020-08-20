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
          {options.map(({ key, text }) => {
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
                />
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    )
}

const trigger = (value) => {
  const val = value || []
  return <div>{val.length === 1 ? val[0] : `${val.length} valittu`}</div>
}

DropdownMultiselect.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default DropdownMultiselect

