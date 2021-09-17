import React, { Component } from 'react'
import { Combobox } from 'hds-react'
import axios from 'axios'

class CustomADUserSelect extends Component {
  state = {
    options: [],
    currentQuery: null,
    currentValue: null,
  }

  componentDidMount() {
    this.getPerson()
  }

  getModifiedOption({ name, id, email, title }) {
    const label = name && title ? `${name} (${title})` : name ? name : email
    return { label, id }  
  }
  modifyOptions = options => {
    const modifiedOptions = []

    if (options.length === 0) {
      return []
    }
    options.forEach(({ name, id, email, title }) => {
      const label = name && title ? `${name} (${title})` : name ? name : email

      if (modifiedOptions.find(option => option.label === label)) {
        modifiedOptions.push({ label: email, id })
      } else {
        modifiedOptions.push({ label: label, id })
      }
    })
    return modifiedOptions
  }
  getPerson = async () => {

    await axios.get(`/v1/personnel/${this.props.input.value}`).then(response => {
      this.setState({ ...this.state, currentValue: { label: response.data.name, id: response.data.id }  })
    })
  }

  getOptions = async query => {
    if (!query || query === this.state.currentQuery || query.length < 3) {
      return []
    }
    await axios.get(`/v1/personnel/?search=${query}`).then(response => {
      const result = response.data

      this.setState({
        ...this.state,
        options: this.modifyOptions(result),
        currentQuery: query
      })
    })
  }
  handleFilter = (items, search) => {

    setTimeout(() => {
      this.getOptions(search)
    }, 300);
   
    return items
  }

  render() {
    return (
      <div id="test">
        <Combobox
          options={this.state.options}
          filter={this.handleFilter}
          placeholder={this.props.placeholder}
          clearable={true}
          onChange={value => {
            this.setState( {...this.state, currentValue: value, options:[]})
            value && this.props.input.onChange(value.id)}
            }
            value={this.state.currentValue}
            defaultValue={this.state.currentValue}
          onBlur={this.props.onBlur}
        />
      </div>
    )
  }
}

export default CustomADUserSelect
