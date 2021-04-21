import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Segment } from 'semantic-ui-react'
import CustomMap from './CustomMap'
import FloorAreaChart from './FloorAreaChart'
import ProjectsChart from './ProjectsChart'

import './styles.scss'
import { NavHeader } from '../common/NavHeader'
import { connect } from 'react-redux'
import { getProjectsOverviewFilters } from '../../actions/projectActions'
import { projectOverviewFiltersSelector } from '../../selectors/projectSelector'

const Overview = ({ getProjectsOverviewFilters, filterData }) => {
  const { t } = useTranslation()
  const [currentFilterData, setCurrentFilterData] = useState(filterData)

  useEffect(() => {
    getProjectsOverviewFilters()
  }, [])

  useEffect(() => {
    setCurrentFilterData(filterData)
  }, [filterData])

  const getFilters = key => {
    const filters = []

    currentFilterData && currentFilterData.forEach(filter => {
      if (filter[key]) {
        filters.push(filter)
      }
    })
    return filters
  }

  return (
    <div className="overview">
      <NavHeader
        routeItems={[{ value: 'Yleisnäkymä', path: '/' }]}
        title={t('overview.title')}
      />
      <Grid stackable columns="equal">
        <Grid.Column>
          <Segment>
            <CustomMap filters={getFilters('filters_on_map')} />
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid stackable columns="equal">
        <Grid.Column>
          <Segment>
            <FloorAreaChart
              filters={getFilters('filters_floor_area')}
              current="360000"
              total="700000"
            />
          </Segment>
        </Grid.Column>
      </Grid>

      <Grid stackable columns="equal">
        <Grid.Column width={8}>
          <Segment>
            <ProjectsChart filters={getFilters('filters_by_subtype')} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}
const mapDispatchToProps = {
  getProjectsOverviewFilters
}

const mapStateToProps = state => {
  return {
    filterData: projectOverviewFiltersSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
