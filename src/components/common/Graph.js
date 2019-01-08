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

  // This is required to get unique labels for different rows.
  // If labels aren't unique, then the colors of the bars won't
  // be shown properly in cases where there are different amount
  // of bars in each row.
  getSuffix = (x) => {
    let res = ''
    for (let i = 0; i < x; i++) res += ' '
    return res
  }

  formatRows = () => {
    const { data } = this.props
    let rows = []
    data.forEach((obj, j) => {
      for (let i = 0; i < obj.deadlines.length; i++) {
        let row = []
        row.push(obj.title)
        row.push(`${i + 1}${this.getSuffix(j)}`)
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

    // Concat all colors
    const colors =  [].concat.apply([], data.map((d) => d.colors))
    colors.push('black')

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
          height='100%'
          options={options}
          chartLanguage='fi'
        />
      </div>
    )
  }
}

export default Graph