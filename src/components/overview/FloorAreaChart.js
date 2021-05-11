import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  YAxis,
  XAxis,
  Legend,
  CartesianGrid,
  Line,
  Bar,
  ResponsiveContainer,
  ComposedChart,
  Label,
  ReferenceLine
} from 'recharts'
import { useTranslation } from 'react-i18next'
import FilterList from './Filters/FilterList'
import { Grid, GridColumn, Popup } from 'semantic-ui-react'
import { isNaN } from 'lodash'
import {
  getFloorAreaChartData,
  BUSINESS_PREMISES,
  OTHER,
  LIVING,
  PREDICTION,
  PUBLIC
} from './floorAreaChartUtils'
import { projectOverviewFloorAreaSelector } from '../../selectors/projectSelector'

import { getProjectsOverviewFloorArea, clearProjectsOverviewFloorArea } from '../../actions/projectActions'
import { connect } from 'react-redux'
import { LoadingSpinner, Button } from 'hds-react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
function FloorAreaChart({
  filters,
  chartData,
  getProjectsOverviewFloorArea,
  history,
  isPrivileged,
  clearProjectsOverviewFloorArea
}) {
  const { t } = useTranslation()

  const [filter, setFilter] = useState({})

  const [current, setCurrent] = useState(0)
  const [total, setTotal] = useState(0)

  const [currentChartData, setCurrentChartData] = useState(null)

  useEffect(() => {
    getProjectsOverviewFloorArea(filter)
    setCurrentChartData(getFloorAreaChartData(chartData))
  }, [])

  useEffect(() => {
    getProjectsOverviewFloorArea(filter)
  }, [filter])

  useEffect(() => {
    setCurrentChartData(getFloorAreaChartData(chartData))
  }, [chartData])

  useEffect(() => {
    setCurrent(chartData.total_to_date)
    setTotal(chartData.total_predicted)
  }, [chartData])

  const onFilterChange = values => {

    clearProjectsOverviewFloorArea()
    setCurrentChartData(null)
    if ( !values || values.length === 0 ) {
      setFilter({})
      return 
    }
    const valueArray = []
    let parameter
   
    values.forEach(value => {
      valueArray.push(value.value)
      parameter = value.parameter
    })

    setFilter({
      ...filter,
      [parameter]: valueArray
    })
  }

  const goToProjectCard = id => {
    if (history) {
      history.push(`/${id}`)
    }
  }
  const goToProjectEdit = id => {
    if (history) {
      history.push(`/${id}/edit`)
    }
  }

  const CustomizedLabel = props => {
    const { x, y, width, height, value } = props

    if (isNaN(height)) {
      return null
    }

    let currentHeight = height / value

    if (currentHeight < 0) {
      currentHeight = -currentHeight
    }

    const renderList = () => {
      const rects = []
      for (let index = 1; index <= value; index++) {
        let currentY = y + index * currentHeight - currentHeight
        rects.push(
          <Popup
            on="click"
            key={index + props.payload.date}
            trigger={
              <g key={index}>
                <rect
                  x={x}
                  y={currentY}
                  width={width}
                  height={currentHeight - 3}
                  stroke="none"
                  fill={getProjectColour(index)}
                  className="bar"
                  style={{ stroke: 'black', strokeWidth: 1 }}
                  data-for="test"
                ></rect>
              </g>
            }
          >
            {renderPopupValue(index)}
          </Popup>
        )
      }

      return rects
    }
    const getProjectInformation = index => {
      const dailyStats = chartData && chartData.daily_stats

      const current = getFormattedDate2(props.payload.date)
      const currentDate = dailyStats.find(stats => {
        if (stats.date === current) return stats
      })

      return currentDate && currentDate.projects && currentDate.projects[index - 1]
    }

    const getProjectColour = index => {

      if ( !chartData ) {
        return
      }
      const dailyStats = chartData && chartData.daily_stats

      const current = getFormattedDate2(props.payload.date)
      const currentDate = dailyStats.find && dailyStats.find(stats => {
        if (stats.date === current) return stats
      })

      const project =
        currentDate && currentDate.projects && currentDate.projects[index - 1]

      return project && project.phase.color_code
    }

    const renderPopupValue = index => {
      const project = getProjectInformation(index)

      if (!project) {
        return null
      }

      return (
        <Grid columns="equal" className="tooltip">
          <Grid.Row>
            <Grid.Column>{project.pino_number}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="header">{project.name}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{t('floor-area.tooltip.phase')}</Grid.Column>
            <Grid.Column textAlign="right">
              <span
                style={{ backgroundColor: project.phase.color }}
                className="dot"
              ></span>
              <span className="value">{project.phase.name}</span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{t('floor-area.tooltip.process-size')}</Grid.Column>
            <Grid.Column className="value" textAlign="right">
              {project.subtype.name}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{t('floor-area.tooltip.responsible-person')}</Grid.Column>
            <Grid.Column className="value" textAlign="right">
              {project.user_name}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="button-area">
              <Button
                onClick={() => goToProjectCard(project.id)}
                className="tooltip-button"
                variant="supplementary"
              >
                {t('floor-area.tooltip.show-project-card')}
              </Button>
            </Grid.Column>
            <Grid.Column className="button-area" textAlign="right">
              {isPrivileged && (
                <Button
                  onClick={() => goToProjectEdit(project.id)}
                  className="tooltip-button"
                  variant="supplementary"
                >
                  {t('floor-area.tooltip.modify')}
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

    const rects = renderList()

    return <svg>{rects}</svg>
  }
 

  const getFormattedDate = date => {
    return moment(date).format('DD.MM')
  }
  const getFormattedDate2 = date => {
    return moment(date).format('YYYY-MM-DD')
  }

  return (
    <div className="floor-area">
      <Grid stackable columns="equal">
        <Grid.Column width={6}>
          <h3>{t('floor-area.title', { date: getFormattedDate(chartData.date) })}</h3>
        </Grid.Column>
        <GridColumn className="filters" textAlign="left">
          <FilterList
            currentFilter={filter}
            onChange={onFilterChange}
            filterList={filters}
          />
        </GridColumn>
      </Grid>
      {!currentChartData &&  <LoadingSpinner className="center" />}
      { currentChartData && <div className="chart-area">
        <div className="total-floor-area">
          <span className="current-number">
            {t('floor-area.current-number', { current })}
          </span>
          <span>{t('floor-area.total-number', { total })}</span>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={currentChartData.floorAreas}>
            <ReferenceLine
              label={t('floor-area.now')}
              yAxisId="left"
              type="number"
              x={new Date().getTime()}
              stroke="red"
            />

            <XAxis
              interval={1}
              scale="time"
              tickCount={104}
              domain={['auto', 'auto']}
              type="number"
              dataKey="date"
              angle={-45}
              textAnchor="end"
              tickFormatter={getFormattedDate}
            />
            <YAxis yAxisId="left">
              <Label
                dx={-30}
                angle={-90}
                position="centerTop"
                style={{ fontSize: '12px' }}
                value={t('floor-area.y-axis-title')}
              ></Label>
            </YAxis>
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 20]}
              scale="linear"
              hide={false}
            >
              <Label
                angle={-90}
                position="centerTop"
                style={{ fontSize: '12px' }}
                value={t('floor-area.y-axis-title-projects-in-meeting')}
              ></Label>
            </YAxis>
            <Bar
              shape={<CustomizedLabel />}
              isAnimationActive={false}
              yAxisId="right"
              dataKey="meetings"
              fill="lightBlue"
              legendType="none"
            />
            <Legend />
            <CartesianGrid yAxisId="left" vertical={false} opacity={0.4} />

            <Line
              isAnimationActive={false}
              legendType="plainline"
              name={t('floor-area.living-area')}
              type="monotone"
              dataKey={LIVING}
              stroke="grey"
              strokeWidth="2px"
              dot={false}
              yAxisId="left"
            />

            <Line
              isAnimationActive={false}
              legendType="none"
              type="monotone"
              dataKey={LIVING + PREDICTION}
              stroke="grey"
              strokeDasharray="3 3"
              strokeWidth="2px"
              dot={false}
              yAxisId="left"
            />
            <Line
              isAnimationActive={false}
              legendType="plainline"
              name={t('floor-area.public-area')}
              type="monotone"
              dataKey={PUBLIC}
              stroke="blue"
              strokeWidth="2px"
              dot={false}
              yAxisId="left"
            />
            <Line
              isAnimationActive={false}
              legendType="none"
              type="monotone"
              dataKey={PUBLIC + PREDICTION}
              stroke="blue"
              strokeWidth="2px"
              strokeDasharray="3 3"
              dot={false}
              yAxisId="left"
            />

            <Line
              isAnimationActive={false}
              legendType="plainline"
              name={t('floor-area.business-area')}
              type="monotone"
              dataKey={BUSINESS_PREMISES}
              stroke="green"
              strokeWidth="2px"
              dot={false}
              yAxisId="left"
            />
            <Line
              isAnimationActive={false}
              legendType="none"
              type="monotone"
              dataKey={BUSINESS_PREMISES + PREDICTION}
              stroke="green"
              strokeDasharray="3 3"
              strokeWidth="2px"
              dot={false}
              yAxisId="left"
            />
            <Line
              isAnimationActive={false}
              legendType="plainline"
              name={t('floor-area.other-area')}
              type="monotone"
              dataKey={OTHER}
              stroke="black"
              strokeWidth="2px"
              dot={false}
              yAxisId="left"
            />
            <Line
              isAnimationActive={false}
              legendType="none"
              type="monotone"
              dataKey={OTHER + PREDICTION}
              stroke="black"
              strokeDasharray="3 3"
              strokeWidth="2px"
              dot={false}
              yAxisId="left"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>}
    </div>
  )
}

FloorAreaChart.propTypes = {
  chartData: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired
}

const mapDispatchToProps = {
  getProjectsOverviewFloorArea,
  clearProjectsOverviewFloorArea
}

const mapStateToProps = state => {
  return {
    chartData: projectOverviewFloorAreaSelector(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FloorAreaChart))
