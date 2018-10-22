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

  getPhase = (i) => {
    if (i === 0) {
      return 'KÄYNNISTYS'
    } else if (i === 1) {
      return 'OAS'
    } else if (i === 2) {
      return 'EHDOTUS'
    } else if (i === 3) {
      return 'TARKISTETTU EHDOTUS'
    } else if (i === 4) {
      return 'KANSLIA-KHS-VALTUUSTO'
    } else {
      return 'VOIMAANTULO'
    }
  }

  formatRows = () => {
    const { data } = this.props
    let rows = []
    data.forEach((obj) => {
      for (let i = 0; i < obj.phases.length - 1; i++) {
        let row = []
        row.push(obj.title)
        row.push(`${i + 1}`)
        row.push(this.getPhase(i))
        row.push(obj.phases[i])
        row.push(obj.phases[i + 1])
        rows.push(row)
      }
    })
    rows.push([ '\0', 'Nyt', 'Nyt', new Date(), new Date()])
    return rows
  }

  render() {
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
      <div className='chart'>
        <Chart
          chartType='Timeline'
          data={[this.columns, ...rows]}
          width='100%'
          height={height}
          options={options}
        />
      </div>
    )
  }
}

export default Graph