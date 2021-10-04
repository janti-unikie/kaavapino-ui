import React from 'react'
import FilterField from './FilterField'

function Filter({ filter }) {  
  const formatChoices = choices => {
    if ( !choices ) {
      return []
    }
    return  choices.map(choice => {
      return {
        key: choice.identifier,
        value: choice.identifier,
        label: choice.value
      }
    })
  }
  return (
    <div className="report-filter">
      <h4>
        {filter.name}
      </h4>
        <div className="filter-field">
        <FilterField
          key={`${filter.identifier}`}
          type={filter.type}
          id={filter.identifier}
          options={formatChoices(filter.choices)}
        />
         </div>
    </div>
  )
}

export default Filter
