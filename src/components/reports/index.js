import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchReports } from '../../actions/reportActions'
import { NavHeader } from '../common/NavHeader'
import ReportBuilder from './ReportBuilder'

function Reports(props) {
  useEffect(() => {
    props.fetchReports()
  }, [])

  return (
    <div className="reports-page">
      <NavHeader
        routeItems={[
          { value: 'Kaavaprojektit', path: '/projects' },
          { value: 'Raportit', path: '/reports' }
        ]}
        title="Raportit"
      />
      <ReportBuilder />
    </div>
  )
}

const mapDispatchToProps = {
  fetchReports
}

export default connect(null, mapDispatchToProps)(Reports)
