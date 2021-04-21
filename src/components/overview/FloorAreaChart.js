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
  OVERALL,
  PREDICTION,
  PUBLIC
} from './floorAreaChartUtils'
import { projectOverviewFloorAreaSelector } from '../../selectors/projectSelector'

import { getProjectsOverviewFloorArea } from '../../actions/projectActions'
import { connect } from 'react-redux'
import { LoadingSpinner } from 'hds-react'
import moment from 'moment'

function FloorAreaChart({
  current,
  total,
  filters,
  chartData,
  getProjectsOverviewFloorArea
}) {
  const { t } = useTranslation()

  const [filter, setFilter] = useState({})

  const [currentChartData, setCurrentChartData] = useState(
    getFloorAreaChartData(chartData)
  )

  useEffect(() => {
    getProjectsOverviewFloorArea(filter)
  }, [])

  useEffect(() => {
    getProjectsOverviewFloorArea(filter)
  }, [filter])

  useEffect(() => {
    setCurrentChartData(getFloorAreaChartData(chartData))
  }, [chartData])

  const onFilterChange = value => {
    setFilter({
      ...filter,
      [value.parameter]: value.key
    })
  }
  const CustomizedLabel = props => {
    const { fill, x, y, width, height, value } = props

    if (isNaN(height)) {
      return null
    }

    let currentHeight = height / value

    if (currentHeight < 0) {
      currentHeight = -currentHeight
    }

    const formatDate = value => {
      return moment(value).format('DD.MM')
    }

    const renderList = () => {
      const rects = []
      for (let index = 1; index <= value; index++) {
        let currentY = y + index * currentHeight - currentHeight
        rects.push(
          <Popup
            on="click"
            key={index + props.payload.date}
            trigger={(
              <g key={index}>
                <rect
                  x={x}
                  y={currentY}
                  width={width}
                  height={currentHeight - 3}
                  stroke="none"
                  fill={fill}
                  className="bar"
                  style={{ stroke: 'black', strokeWidth: 1 }}
                  data-for="test"
                ></rect>
              </g>
            )}
          >
            {renderPopupValue(index)}
          </Popup>
        )
      }

      return rects
    }
    const renderPopupValue = index => (
      <div>
        {index}. {formatDate(props.payload.date)}
      </div>
    )

    const rects = renderList()

    return <svg>{rects}</svg>
  }
  if (!currentChartData) {
    return <LoadingSpinner className="center" />
  }

  const getFormattedDate = date => {
    return moment(date).format('DD.MM')
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

      <div className="total-floor-area">
        <span className="current-number">
          {t('floor-area.current-number', { current })}
        </span>
        <span>{t('floor-area.total-number', { total })}</span>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={currentChartData.floorAreas}>
          <ReferenceLine
            label="Now"
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
            name={t('floor-area.all-area')}
            type="monotone"
            dataKey={OVERALL}
            stroke="grey"
            strokeWidth="2px"
            dot={false}
            yAxisId="left"
          />

          <Line
            isAnimationActive={false}
            legendType="none"
            type="monotone"
            dataKey={OVERALL + PREDICTION}
            stroke="grey"
            strokeDasharray="3 3"
            strokeWidth="2px"
            dot={false}
            yAxisId="left"
          />
          <Line
            isAnimationActive={false}
            legendType="plainline"
            name={t('floor-area.living-area')}
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
    </div>
  )
}

FloorAreaChart.propTypes = {
  current: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  chartData: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired
}

const mapDispatchToProps = {
  getProjectsOverviewFloorArea
}

const mapStateToProps = state => {
  return {
    chartData: projectOverviewFloorAreaSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorAreaChart)
