import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerField, unregisterField, change } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import Field from './Field'

class FieldSet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: [{}]
    }
  }

  componentDidMount() {
    const { field, attributeData } = this.props
    this.props.registerField('editForm', field.name, 'Field')
    const values = attributeData[field.name]
    if (values) {
      this.setState({ values })
    }
  }

  componentWillUnmount() {
    const { field } = this.props
    this.props.unregisterField('editForm', field.name, 'Field')
  }

  handleChange = (value, i, name) => {
    const { field } = this.props
    const newValues = [ ...this.state.values ]
    newValues[i] = { ...this.state.values[i] }
    newValues[i][name] = value
    this.setState({ values: newValues })
    this.props.change('editForm', field.name, newValues)
  }

  addSet = () => this.setState((prevState) => ({ values: [ ...prevState.values, {} ] }))

  removeSet = () => {
    const { field } = this.props
    const { values } = this.state
    if (values.length > 1) {
      const newValues = this.state.values.slice(0, -1)
      this.setState({ values: newValues })
      this.props.change('editForm', field.name, newValues)
    }
  }

  render() {
    const { field, checking, attributeData } = this.props
    const { values } = this.state
    return (
      <React.Fragment>
        { values.map((value, i) => (
          <div key={i} className='fieldset-container'>
            { field.fieldset_attributes.map((attribute, j) => {
              const fieldValue = (value[attribute.name] !== undefined) ? value[attribute.name] : ''
              const required = checking && attribute.required && (!attributeData[field.name][i] || !attributeData[field.name][i][attribute.name])
              return (
                <div className='input-container' key={j}>
                  <div className='input-header'>
                    <Form.Field required={ required }>
                      <label className={`input-title${required ? ' highlight': ''}`}>{ attribute.label }</label>
                    </Form.Field>
                  </div>
                  <Field
                    key={j}
                    value={fieldValue}
                    field={attribute}
                    connected={false}
                    onChange={(e) => this.handleChange(e, i, attribute.name)}
                  />
                </div>
              )
            }) }
          </div>
        )) }
        <Button onClick={this.addSet}>+</Button>
        <Button onClick={this.removeSet} disabled={values.length === 1}>-</Button>
      </React.Fragment>
    )
  }
}

const mapActionsToProps = {
  registerField,
  unregisterField,
  change
}

export default connect(
  null,
  mapActionsToProps
)(FieldSet)