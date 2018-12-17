import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import Field from '../input/Field'

class Filter extends Component {
  state = {
    selectedOption: null
  }

  formatOptions = (options) => {
    return options.map((option) => {
      return {
        key: option,
        value: option,
        text: option
      }
    })
  }

  render() {
    const { id, options, type } = this.props
    const { selectedOption } = this.state
    return (
      <div className='filter'>
        <p>{ id }</p>
        <Dropdown
          fluid
          selection
          clearable
          options={this.formatOptions(options)}
          onChange={(e, data) => this.setState({ selectedOption: data.value })}
        />
        {
          selectedOption &&
          <Field field={{ type, name: `${id}__${selectedOption}` }} />
        }
      </div>
    )
  }
}

export default Filter