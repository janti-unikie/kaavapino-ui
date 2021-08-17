import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMapLegends } from '../../actions/projectActions'
import { projectMapLegendsSelector } from '../../selectors/projectSelector'
import { useTranslation } from 'react-i18next'

function Legends({ getMapLegends, legends, centered }) {
  const { t } = useTranslation()

  useEffect(() => {
    getMapLegends()
  }, [])

  return (
    <div className={`color-legends ${centered ? 'centered' : ''}`}>
      <span>{t('project.phase')}</span>
      {legends &&
        legends.phases &&
        legends.phases.map(phase => {
          return (
            <span key={phase.name} className="color-legend">
              <span
                style={{ backgroundColor: phase && phase.color_code }}
                className="dot"
              ></span>
              <span>{phase.name}</span>
            </span>
          )
        })}
    </div>
  )
}

const mapDispatchToProps = {
  getMapLegends
}

const mapStateToProps = state => {
  return {
    legends: projectMapLegendsSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Legends)
