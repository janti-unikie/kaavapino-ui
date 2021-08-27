import React, { useState, useEffect } from 'react'
import projectUtils from '../../../utils/projectUtils'
import { Checkbox } from 'hds-react'
import CustomADUserCombobox from '../../input/CustomADUserCombobox'

export default function MobileFilterList({ filter, onChange, onUserFilterChange }) {
  const [checkedItems, setCheckedItems] = useState({})

  useEffect(() => {

    
    console.log("🚀 ~ file: MobileFilterList.js ~ line 29 ~ useEffect ~ checkedItems", checkedItems)

    let returnValue = []
   
   const keys = Object.keys( checkedItems )
   keys.forEach( key => checkedItems[key] && returnValue.push( key ))
  
   console.log("🚀 ~ file: MobileFilterList.js ~ line 15 ~ useEffect ~ returnValue", returnValue)

    onChange(returnValue, filter.parameter)
  }, [checkedItems])

  const handleChange = e => {
    const item = e.target.id
    const isChecked = e.target.checked
    setCheckedItems({ ...checkedItems, [item]: isChecked })
  }

  const handleUserChange = value => {
  console.log("🚀 ~ file: MobileFilterList.js ~ line 20 ~ MobileFilterList ~ value", value)
    onUserFilterChange(value, filter.parameter)
  }

  const renderFields = () => {
    if (filter.value_type === 'user') {
       return (
        <CustomADUserCombobox
          label={filter.name}
          input={{ onChange: handleUserChange }}
          multiselect={true}
        />
      )
    }
    let choices = []
    if (!filter) {
      return null
    }
    if (!filter.choices || filter.choices.length === 0) {
      if (filter.accepts_year) {
        choices = projectUtils.generateArrayOfYearsForChart()
      }
    } else {
      choices = filter.choices
    }

    return choices.map(field => {
      return (
        <Checkbox
          onChange={handleChange}
          id={field.value}
          key={field.value}
          label={field.label}
          checked={checkedItems[field.value]}
        />
      )
    })
  }
  return <div>{renderFields()}</div>
}
