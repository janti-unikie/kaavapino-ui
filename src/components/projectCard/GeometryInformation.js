import React from 'react'
import { useTranslation } from 'react-i18next'
import Geometry from '../input/Geometry'

function GeometryInformation() {
  const { t } = useTranslation()

  return (
    <div>
      <h3>{t('project.planning-area-constraints')}</h3>
      <div className="geometry-input-container">
        <Geometry />
      </div>
    </div>
  )
}
export default GeometryInformation
