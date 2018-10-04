import React from 'react'
import { Radio } from 'semantic-ui-react'

class CustomRadio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '-'
    }
  }

  handleChange = (e, data) => {
    console.log('data', data)
    this.setState({ value: data.value })
    this.props.handleChange(this.props.name, data.checked)
  }

  render() {
    console.log('öö', this.state.value)
    /* return <Radio onChange={this.handleChange} toggle checked={this.state.checked} /> */
    return (
      <div className='radio-input-container'>
        <Radio
          label='Kyllä'
          name={`radio-${this.props.name}`}
          value='y'
          checked={this.state.value === 'y'}
          onChange={this.handleChange}
        />
        <Radio
          label='Ei'
          name={`radio-${this.props.name}`}
          value='n'
          checked={this.state.value === 'n'}
          onChange={this.handleChange}
        />
        <Radio
          label='Tieto puuttuu'
          name={`radio-${this.props.name}`}
          value='-'
          checked={this.state.value === '-'}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default CustomRadio