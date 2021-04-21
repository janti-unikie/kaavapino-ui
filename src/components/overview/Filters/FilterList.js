import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DropdownFilter from './DropdownFilter'
import projectUtils from '../../../utils/projectUtils'
import { Button } from 'hds-react'
import { Grid } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
function FilterList({ filterList, currentFilter, onChange, showClearButton, onClear }) {
  const { t } = useTranslation()

  const [filters, setFilters] = useState( currentFilter )

  const formatOptions = field => {
    let options = field.choices
    if (field.accepts_year) {
      options = projectUtils.generateArrayOfYears()
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
  useEffect(() => {
    setFilters(currentFilter)
  }, [currentFilter])

  const clearFilters = () => {
    onClear()
  }

  const getFiltersList = () => {
    if (!filterList) {
      return null
    }

    return filterList.map((field, index) => (
      <Grid.Column key={index}>
        <DropdownFilter
          key={field + index}
          name={field.name}
          defaultValue={filters[field.name] ? filters[field.name] : null}
          options={formatOptions(field)}
          placeholder={field.name}
          onChange={onChange}
          type={field.type}
        />
      </Grid.Column>
      )
    )
  }

  return (
    <div className="filters-list">
      <Grid stackable columns="equal">
        {getFiltersList()}
        {showClearButton && (
        <Grid.Column>

          <Button variant="secondary" onClick={clearFilters} className="filter-button">
            {t('overview.clear-selections')}
          </Button>
        </Grid.Column>
        )}
      </Grid>

      <span>

      </span>
    </div>
  )
}

FilterList.propTypes = {
  filterList: PropTypes.array
}

export default FilterList
