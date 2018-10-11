import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import SelectInput from '../input/SelectInput'
import TextArea from '../input/TextArea'
import Radio from '../input/Radio'
import List from '../input/List'
import Button from '../common/Button'
import Input from '../input/Input'
import File from '../input/File'
import { Form } from 'semantic-ui-react'

class ProjectForm extends Component {
  constructor(props) {
    super(props)

    this.updates = {}

    this.state = {
      opened: null
    }
  }

  handleChange = (id, newValues) => {
    this.updates[id] = newValues
  }

  getInput = (input, id) => {
    switch (input.type) {
      case 'text': {
        return <Input type='text' handleChange={this.handleChange} name={id} placeholder={ input.title } />
      }

      case 'select': {
        return <SelectInput multiple={false} handleChange={this.handleChange} name={id} options={ input.options } />
      }

      case 'radio': {
        return <Radio handleChange={this.handleChange} name={id} title={ input.title } />
      }

      case 'date': {
        return <Input type='date' handleChange={this.handleChange} name={id} />
      }

      case 'multiple': {
        return <SelectInput multiple handleChange={this.handleChange} name={id} options={ input.options } />
      }

      case 'number': {
        return <Input type='number' handleChange={this.handleChange} name={id} placeholder={0} />
      }

      case 'list': {
        return <List handleChange={this.handleChange} name={id} />
      }

      case 'file': {
        return <File handleChange={this.handleChange} name={id} />
      }

      default: {
        return <TextArea handleChange={this.handleChange} name={id} title={ input.title } />
      }
    }
  }

  handleSubmit = () => {
    console.log('updates:', this.updates)
  }

  openTooltip = (i) => {
    let newOpened = `${i}`
    if (newOpened === this.state.opened) {
      newOpened = null
    }
    this.setState({ opened: newOpened })
  }

  renderInput = (input, i, j) => {
    const id = `input-${i}-${j}-${this.props.tab}`
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
        { this.getInput(input, id) }
      </div>
    )
  }

  render = () => {
    const { inputs } = this.props
    return (
      <Form className='form-container'>
        { inputs.sections && inputs.sections.map((section, index) => {
          const i = index
          return (
            <div key={index}>
              <span id={`title-${section.title}`} className='form-title'>{ section.title }</span>
              <hr />
              { section.fields && section.fields.map((input, j) => this.renderInput(input, i, j)) }
            </div>
          )
        }) }
        <div className='form-button-container'>
          <Button handleClick={this.handleSubmit} value='Tallenna' check />
          <Button value='Tallenna ja tarkista' check />
        </div>
      </Form>
    )
  }
}

export default ProjectForm
