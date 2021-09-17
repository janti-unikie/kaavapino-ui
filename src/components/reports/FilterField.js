import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import SelectInput from '../input/SelectInput'
import { TextInput } from 'hds-react'
import { REPORT_FORM } from '../../constants'
import CustomADUserCombobox from '../input/CustomADUserCombobox'
import { isArray } from 'lodash'
import { Grid } from 'semantic-ui-react';

function FilterField({ type, id, options, change }) {
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  useEffect(() => {
    if (!start || !end) {
      return
    }
    const value = `${start},${end}`
    change(REPORT_FORM, id, value)
  }, [start, end])
  
  const renderUser = () => {
    return (
      <CustomADUserCombobox
        input={{
          onChange: value => {
            if (!isArray(value)) {
              value && change(REPORT_FORM, id, value.id)
            } else {
              let returnValue = []
              value.forEach(current => returnValue.push(current.id))
              change(REPORT_FORM, id, returnValue.toString())
            }
          }
        }}
        multiselect={true}
      />
    )
  }
  const renderSelect = () => {
    return (
      <SelectInput
        multiple={type === 'multiple' ? true : false}
        options={options}
        className="filter-field"
        input={{
          value: [],
          onChange: value => change(REPORT_FORM, id, value)
        }}
      />
    )
  }
  const renderTimeRange = () => {
    return (
      <div>
        <div className="range-filters">
        <Grid>

          <Grid.Column width={7}>
          <TextInput
            onChange={event => {
              setStart(event.target.value)
            }}
            type="date"
            className="date-input"
            style={{height: "50px"}}
          />
          </Grid.Column>
          <Grid.Column className="center-horizontal" width={1}>
            -
            </Grid.Column>
          <Grid.Column width={7}>
          <TextInput
            onChange={event => {
              setEnd(event.target.value)
            }}
            placeholder="Lopetus"
            type="date"
            className="date-input"
          />
           </Grid.Column>
          </Grid>

        </div>
      </div>
    )
  }

  const renderTextInput = () => {
    let currentType
    if (type === 'string') {
      currentType = 'text'
    }
    if (type === 'number') {
      currentType = 'number'
    }

    return (
      <TextInput
        onChange={event => {
          change(REPORT_FORM, id, event.target.value)
        }}
        type={currentType}
        input={{
          value: null
        }}
      />
    )
  }

  const renderComponent = () => {
    if (options && options.length > 0) {
      return renderSelect()
    }

    if (id === 'henkilo') {
      return renderUser()
    }
    if (type === 'range') {
      return renderTimeRange()
    }

    return renderTextInput()
  }

  return renderComponent()
}

const mapDispatchToProps = {
  change
}

export default connect(null, mapDispatchToProps)(FilterField)
