import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'

const SelectInput = ({ input, meta: { error }, options, ...custom }) => (
  <Dropdown
    { ...input }
    { ...custom }
    onChange={(param, data) => input.onChange(data.value)}
    fluid
    search
    selection
    clearable
    placeholder='Klikkaa avataksesi'
    noResultsMessage='Ei tuloksia'
    options={ options }
    error={inputUtils.hasError(error)}
  />
)

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectInput