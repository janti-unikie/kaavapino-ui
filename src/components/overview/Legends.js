import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMapLegends } from '../../actions/projectActions'
import { projectMapLegendsSelector } from '../../selectors/projectSelector'

function Legends({ getMapLegends, legends }) {
  useEffect(() => {
    getMapLegends()
  }, [])

  return (
    <div className="color-legends">
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
