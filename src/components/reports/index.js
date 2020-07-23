import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchReports } from '../../actions/reportActions'
import { NavHeader } from '../common/NavHeader'
import ReportBuilder from './ReportBuilder'

class Reports extends Component {
  componentDidMount() {
    this.props.fetchReports()
  }

  render() {
    return (
      <div className="reports-page">
        <NavHeader
          routeItems={[
            { value: 'Kaavahankkeet', path: '/' },
            { value: 'Raportit', path: '/reports' }
          ]}
          title="Raportit"
        />
        <ReportBuilder />
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchReports
}

export default connect(null, mapDispatchToProps)(Reports)
