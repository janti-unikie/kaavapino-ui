import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const SelectInput = ({ input, options, ...custom }) => (
  <Dropdown
    { ...input }
    { ...custom }
    onChange={(param, data) => input.onChange(data.value)}
    fluid
    search
    selection
    placeholder='Klikkaa avataksesi'
    options={ options.map((option) => ({ key: option, value: option, text: option })) }
  />
)

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array
}

export default SelectInput