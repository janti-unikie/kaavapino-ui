import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  getFloorAreaChartData,
  LIVING_OVERALL
} from './floorAreaChartUtils'
import {
  projectOverviewFloorAreaSelector,
  projectOverviewFloorAreaFiltersSelector,
  projectOverviewFloorAreaTargetsSelector
} from '../../selectors/projectSelector'

import {
  getProjectsOverviewFloorArea,
  clearProjectsOverviewFloorArea,
  setProjectsOverviewFloorAreaFilter,
  getProjectsOverviewFloorAreaTargets
} from '../../actions/projectActions'
import { connect } from 'react-redux'
import { Accordion, LoadingSpinner, Card } from 'hds-react'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import { Grid } from 'semantic-ui-react'

function FloorAreaMobile({
  chartData,
  getProjectsOverviewFloorAreaTargets,
  floorAreaTargets
}) {
  const { t } = useTranslation()

  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)
  const currentYear = dayjs(chartData.date).year()

  useEffect(() => {
    getProjectsOverviewFloorAreaTargets()
  }, [])

  useEffect(() => {
    setTotal(floorAreaTargets[currentYear] ? floorAreaTargets[currentYear] : 0)
  }, [chartData])

  useEffect(() => {
    const graphData = getFloorAreaChartData(chartData)
    const livingOverall = graphData && graphData[LIVING_OVERALL]
    setCurrent(livingOverall ? livingOverall : 0)
  }, [chartData])

  useEffect(() => {
    setTotal(floorAreaTargets[currentYear])
  }, [floorAreaTargets])

  const getFormattedHeaderDate = date => {
    return dayjs(date).format('DD.MM.YYYY')
  }

  const renderMeetings = () => {
    return (
      chartData &&
      chartData.daily_stats &&
      chartData.daily_stats.map(item => renderItem(item))
    )
  }

  const renderItem = item => {
    return (
      <Accordion
        heading={getFormattedHeaderDate(item.date) + ' ' + item.meetings + ' projektia'}
        className="mobile-accordion"
        headingLevel={4}
        key={item.date}
      >
        {renderProjects(item.projects)}
      </Accordion>
    )
  }
  const renderProjects = projects => {
    if ( !projects || projects.length === 0 ) {
      return <div>Ei projekteja</div>
    }
    return projects.map(project => renderProject(project))
  }

  const renderProject = project => {

    return (
      <div key={project.id}>
        <Card >
          <Grid columns="equal" textAlign="left">
            <Grid.Column width={10}>
              <div>{project.pino_number}</div>
              <div>{project.name}</div>
              <div>{project.subtype.name}</div>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <span
                style={{ backgroundColor: project.phase.color }}
                className="dot"
              ></span>
              <span className="value">{project.phase.name}</span>
            </Grid.Column>
          </Grid>
        </Card>
        <br />
      </div>
    )
  }

  const isChartDataLoaded = () => {
    if ( !chartData || Object.entries( chartData ).length === 0) {
      return false
    }
   return true
  }
  return (
    <div className="floor-area">
      {!isChartDataLoaded() && <LoadingSpinner className="center" />}
      {isChartDataLoaded() && (
        <div className="chart-area-mobile">
          <h3>{t('floor-area.mobile-title')}</h3>
          <div className="total-floor-area">
            <div className="current-number">
              {t('floor-area.current-number', { current })}
            </div>
            <span>{t('floor-area.total-number', { total })}</span>
          </div>
          {renderMeetings()}
        </div>
      )}
    </div>
  )
}

FloorAreaMobile.propTypes = {
  chartData: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  getProjectsOverviewFloorArea,
  clearProjectsOverviewFloorArea,
  setProjectsOverviewFloorAreaFilter,
  getProjectsOverviewFloorAreaTargets
}

const mapStateToProps = state => {
  return {
    chartData: projectOverviewFloorAreaSelector(state),
    storedFilter: projectOverviewFloorAreaFiltersSelector(state),
    floorAreaTargets: projectOverviewFloorAreaTargetsSelector(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FloorAreaMobile))
