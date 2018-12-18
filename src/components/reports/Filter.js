import React, { Component } from 'react'
import { Dropdown, Header } from 'semantic-ui-react'
import FilterField from './FilterField'
import reportUtils from '../../utils/reportUtils'

class Filter extends Component {
  state = {
    selectedOption: null
  }

  formatOptions = (options) => {
    return options.map((option) => {
      return {
        key: option,
        value: option,
        text: reportUtils.getOptionName(option)
      }
    })
  }

  render() {
    const { id, options, type } = this.props
    const { selectedOption } = this.state
    return (
      <div className='filter'>
        <Header as='h4'>
          <Header.Content>
            { `${reportUtils.getFilterName(id)} ` }
            <Dropdown
              inline
              clearable
              header='Valitse suodatin'
              options={this.formatOptions(options)}
              onChange={(e, data) => this.setState({ selectedOption: data.value })}
            />
          </Header.Content>
        </Header>
        {
          selectedOption &&
          <FilterField key={`${id}__${selectedOption}`} type={type} id={id} selectedOption={selectedOption} />
        }
      </div>
    )
  }
}

export default Filter