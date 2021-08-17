import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchReports } from '../../actions/reportActions'
import { NavHeader } from '../common/NavHeader'
import ReportBuilder from './ReportBuilder'
import { useTranslation } from 'react-i18next'

function Reports(props) {

  const {t} = useTranslation()
  useEffect(() => {
    props.fetchReports()
  }, [])

  return (
    <div className="reports-page">
      <NavHeader
        routeItems={[
          { value: t('projects.title'), path: '/projects' },
          { value: t('reports.title'), path: '/reports' }
        ]}
        title={t('reports.title')}
      />
      <ReportBuilder />
    </div>
  )
}

const mapDispatchToProps = {
  fetchReports
}

export default connect(null, mapDispatchToProps)(Reports)
