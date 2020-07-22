import React, { Component } from 'react'
import Filter from './Filter'

class ReportFilters extends Component {
  formatFilters = filters => {
    const result = {}
    filters.forEach(filter => {
      const splittedFilter = filter.identifier.split('__')
      let fName
      if (splittedFilter.length > 1) {
        fName =
          splittedFilter[splittedFilter.length - 1] === 'uuid'
            ? splittedFilter.join('__')
            : splittedFilter.slice(0, -1).join('__')
      } else {
        fName = filter.identifier.split('__')[0]
      }
      if (!result[fName]) {
        result[fName] = {
          type: filter.type !== 'integer' ? filter.type : 'string',
          options: []
        }
      }
      if (!result[fName].options.includes(filter.lookup)) {
        result[fName].options.push(filter.lookup)
      }
    })
    return result
  }

  render() {
    const { filters } = this.props
    const formattedFilters = this.formatFilters(filters)
    return (
      <div>
        {Object.keys(formattedFilters).map(filterKey => (
          <Filter
            key={filterKey}
            id={filterKey}
            options={formattedFilters[filterKey].options}
            type={formattedFilters[filterKey].type}
          />
        ))}
      </div>
    )
  }
}

export default ReportFilters
