import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DropdownFilter from './DropdownFilter'
import projectUtils from '../../../utils/projectUtils'
import { Grid } from 'semantic-ui-react'
function FilterList({
  filterList,
  currentFilter,
  onChange
}) {
  const [filters, setFilters] = useState(currentFilter)

  useEffect(() => {
    setFilters(currentFilter)
  }, [currentFilter])

  const formatOptions = field => {
    let options = field.choices
    if (field.accepts_year) {
      options = projectUtils.generateArrayOfYearsForChart(field.parameter)
    }

    return options.map(option => {
      return {
        key: option.value,
        value: option.value,
        label: option.label,
        parameter: field.parameter
      }
    })
  }

  const getFiltersList = () => {
    if (!filterList) {
      return null
    }
    return filterList.map((field, index) => {
      return (
        <Grid.Column key={index}>
          <DropdownFilter
            key={field + index}
            name={field.name}
            defaultValue={
              filters && filters[field.parameter] ? filters[field.parameter] : null
            }
            options={formatOptions(field)}
            placeholder={field.name}
            onChange={onChange}
            type={field.type}
          />
        </Grid.Column>
      )
    })
  }

  return (
    <div className="filters-list">
      <Grid stackable columns="equal">
        {getFiltersList()}
        {/*
          TODO: Problems with HDS component. Needs to follow when there are updates.
        showClearButton && !isEmpty(filterList) && (
          <Grid.Column>
            <Button variant="secondary" onClick={onClear} className="filter-button">
              {t('overview.clear-selections')}
            </Button>
          </Grid.Column>
        )*/}
      </Grid>

      <span></span>
    </div>
  )
}

FilterList.propTypes = {
  filterList: PropTypes.array
}

export default FilterList
