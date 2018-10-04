import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class SelectInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: props.multiple ? [] : null
    }
  }

  handleChange = (e, data) => {
    this.setState({ selected: data.value })
    this.props.handleChange(this.props.name, data.value)
  }

  render() {
    const { options, name, multiple } = this.props
    return (
      <Dropdown
        onChange={this.handleChange}
        name={name}
        noResultsMessage='Ei tuloksia'
        placeholder='Klikkaa avataksesi'
        multiple={multiple}
        fluid
        search
        selection
        options={options.map((option) => ({ key: option, value: option, text: option }))}
        value={this.state.selected}
      />
    )
  }
}

export default SelectInput