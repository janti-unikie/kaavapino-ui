import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox ,Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'

const ControlledDropdown = ({ input, error, options, ...custom }) => {
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
              <Checkbox className='dropdown' label={text} onChange={(param, data) => {
                if (input.value.indexOf(data.label) !== -1) {
                  let nonSelectedValues = input.value.filter( opt => opt !== data.label )
                  input.onChange(nonSelectedValues)
                } else {
                  input.onChange([...input.value, data.label])}
              }} />
              </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )
}

ControlledDropdown.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default ControlledDropdown
