import React from 'react'
import Filter from './Filter'

function ReportFilters(props) {
  const renderFilters = () => {
    const { filters } = props

    return (
      <span className="reports-filters">
        {filters.map(filter => (
          <Filter key={filter.identifier} filter={filter} className="filter-choice" />
        ))}
      </span>
    )
  }

  return renderFilters()
}

export default ReportFilters
