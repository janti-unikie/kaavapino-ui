import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import TextInput from '../input/TextInput'
import CheckInput from '../input/CheckInput'
import SelectInput from '../input/SelectInput'
import TextArea from '../input/TextArea'
import Radio from '../input/Radio'
import Date from '../input/Date'
import Multiple from '../input/Multiple'
import Number from '../input/Number'
import List from '../input/List'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = { opened: null }
  }

  getInput = (input) => {
    switch (input.type) {
      case 'text': {
        return <TextInput title={ input.title } />
      }

      case 'check': {
        return <CheckInput title={ input.title } />
      }

      case 'select': {
        return <SelectInput options={ input.options } />
      }

      case 'radio': {
        return <Radio title={ input.title } />
      }

      case 'date': {
        return <Date />
      }

      case 'multiple': {
        return <Multiple options={ input.options } />
      }

      case 'number': {
        return <Number />
      }

      case 'list': {
        return <List />
      }

      default: {
        return <TextArea title={ input.title } />
      }
    }
  }

  openTooltip = (i) => {
    let newOpened = `${i}`
    if (newOpened === this.state.opened) {
      newOpened = null
    }
    this.setState({ opened: newOpened })
  }

  renderInput = (input, i, j) => {
    const id = `input-${i}-${j}`
    return (
      <div className='input-container' key={id}>
        <div className='input-header'>
          <span className='input-title'>{ input.title }</span>
          { input.info && (
            <span id={`${id}`} className='input-info' key={i}>?
              <Tooltip placement='right' isOpen={this.state.opened === `${id}`} target={`${id}`} toggle={() => this.openTooltip(id)}>
                { input.info }
              </Tooltip>
            </span>
          )}
        </div>
        { this.getInput(input) }
      </div>
    )
  }

  render = () => {
    const { inputs } = this.props
    return (
      <div className='form-container'>
        { inputs.sections && inputs.sections.map((section, index) => {
          const i = index
          return (
            <div key={index}>
              <div>
                <span id={`title-${section.title}`} className='form-title'>{ section.title }</span>
                <hr />
              </div>
              { section.fields && section.fields.map((input, j) => this.renderInput(input, i, j)) }
            </div>
          )
        }) }
      </div>
    )
  }
}

export default Form
