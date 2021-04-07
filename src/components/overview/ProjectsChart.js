import React, { useState } from 'react'
import { BarChart, YAxis, XAxis, CartesianGrid, Bar, Tooltip } from 'recharts'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import FilterList from './Filters/FilterList'
import { Grid, GridColumn } from 'semantic-ui-react'

function ProjectsChart({ filters, data }) {
  const { t } = useTranslation()

  const [filter, setFilter] = useState({})
  const [selectedPhase, setSelectedPhase] = useState({})

  const onFilterChange = (value, name) => {
    setFilter({
      ...filter,
      [name]: value
    })
  }
  const CustomizedTooltip = props => {
    if (!selectedPhase.phase || !props.payload) {
      return null
    }
    const currentPhase = props.payload.find(
      phase => phase.dataKey === selectedPhase.phase
    )
    if (!currentPhase) {
      return null
    }
    const currentAmount =
      currentPhase.payload && currentPhase.payload[selectedPhase.phase]

    const localizationText = t('project-types.' + selectedPhase.phase)

    return (
      <div className="projects-tooltip">
        <div className="title">{localizationText} </div>
        <div className="number">{currentAmount}</div>
      </div>
    )
  }

  return (
    <div className="projects-size">
      <div className="header">
        <Grid stackable columns="equal">
          <Grid.Column>
            <h3>{t('project-types.title')}</h3>
          </Grid.Column>
          <GridColumn textAlign="right">
            <FilterList
              currentFilter={filter}
              onChange={onFilterChange}
              filterList={filters}
            />
          </GridColumn>
        </Grid>
      </div>

      <BarChart
        layout="vertical"
        width={500}
        height={250}
        data={data}
        minTickGap={0}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomizedTooltip />} />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" minTickGap={1} />

        <Bar
          dataKey="käynnistys"
          stackId="a"
          fill="#02d7a7"
          onMouseOver={() => setSelectedPhase({ phase: 'käynnistys' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
        <Bar
          dataKey="luonnos"
          stackId="a"
          fill="#ffc61e"
          onMouseOver={() => setSelectedPhase({ phase: 'luonnos' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
        <Bar
          dataKey="OAS"
          stackId="a"
          fill="#ffc61e"
          onMouseOver={() => setSelectedPhase({ phase: 'OAS' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
        <Bar
          dataKey="periaatteet"
          stackId="a"
          fill="#009142"
          onMouseOver={() => setSelectedPhase({ phase: 'periaatteet' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
        <Bar
          dataKey="ehdotus"
          stackId="a"
          fill="#fd4f00"
          onMouseOver={() => setSelectedPhase({ phase: 'ehdotus' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
        <Bar
          dataKey="tarkastettuEhdotus"
          stackId="a"
          fill="#0000bf"
          onMouseOver={() => setSelectedPhase({ phase: 'tarkastettuEhdotus' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
        <Bar
          dataKey="hyvaksyminen"
          stackId="a"
          fill="#bd9650"
          onMouseOver={() => setSelectedPhase({ phase: 'hyvaksyminen' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
        <Bar
          dataKey="voimaantulo"
          stackId="a"
          fill="#9ec8eb"
          onMouseOver={() => setSelectedPhase({ phase: 'voimaantulo' })}
          onMouseLeave={() => setSelectedPhase({})}
        />
      </BarChart>
    </div>
  )
}

ProjectsChart.propTypes = {
  data: PropTypes.array.isRequired,
  filters: PropTypes.array
}

export default ProjectsChart
