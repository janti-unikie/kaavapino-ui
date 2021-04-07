import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Segment } from 'semantic-ui-react'
import CustomMap from './CustomMap'
import FloorArea from './FloorAreaChart'
import ProjectsChart from './ProjectsChart'

import './styles.scss'
import { NavHeader } from '../common/NavHeader'
import {
  mockData,
  floorAreaFilters,
  projectTypeData,
  projectTypeFilters,
  mapFilters
} from './overViewMockData'

function Overview() {
  const { t } = useTranslation()

  return (
    <div className="overview">
      <NavHeader
        routeItems={[{ value: 'Yleisnäkymä', path: '/' }]}
        title={t('overview.title')}
      />
      <Grid stackable columns="equal">
        <Grid.Column>
          <Segment>
            <CustomMap filters={mapFilters}/>
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid stackable columns="equal">
        <Grid.Column>
          <Segment>
            <FloorArea
              filters={floorAreaFilters}
              data={mockData}
              current="360000"
              total="700000"
            />
          </Segment>
        </Grid.Column>
      </Grid>

      <Grid stackable columns="equal">
        <Grid.Column width={8}>
          <Segment>
            <ProjectsChart filters={projectTypeFilters} data={projectTypeData} />
          </Segment>
        </Grid.Column>

      </Grid>
    </div>
  )
}

export default Overview
