import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

class Graph extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      { type: 'string', id: 'project' },
      { type: 'string', id: 'status' },
      { type: 'string', role: 'tooltip' },
      { type: 'date', id: 'Start' },
      { type: 'date', id: 'End' }
    ]
  }

  formatRows = () => {
    const { data } = this.props
    let rows = []
    data.forEach((obj) => {
      for (let i = 0; i < obj.deadlines.length; i++) {
        let row = []
        row.push(obj.title)
        row.push(`${i + 1}`)
        row.push(obj.deadlines[i].title)
        row.push(obj.deadlines[i].start)
        row.push(obj.deadlines[i].end)
        rows.push(row)
      }
    })
    rows.push([ '\0', 'Nyt', 'Nyt', new Date(), new Date()])
    return rows
  }

  render() {
    const { data } = this.props
    if (data.length === 0) {
      return null
    }

    let colors = ['#00963b', '#ffc61e', '#fd4f00', '#2400c7', 'black', 'white']
    const options = {
      timeline: {
        colorByRowLabel: false
      },
      colors,
      backgroundColor: '#ebedf1'
    }

    const rows = this.formatRows()
    const { height } = this.props
    return (
      <div className='chart' style={{ height: `${height + 50}px` }}>
        <Chart
          chartType='Timeline'
          data={[this.columns, ...rows]}
          width='100%'
          height={`${height}px`}
          options={options}
        />
      </div>
    )
  }
}

export default Graph