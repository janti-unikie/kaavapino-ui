import React, { Component } from 'react'
import ListHeader from './ListHeader'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
      sort: 2,
      dir: 0
    }
  }

  setFilter = (value) => this.setState({ filter: value })

  setSort = (type) => {
    this.setState((prevState) => {
      if (type === prevState.sort) {
        if (prevState.dir === 0) {
          return { dir: 1 }
        } else {
          return { dir: 0 }
        }
      }

      return { sort: type, dir: 0 }
    })
  }

  render() {
    const { sort, dir } = this.state
    const headerItems = ['Nimi', 'Vaihe', 'Seuraava määräaika', 'Koko', 'Muokattu', 'Vastuuhenkilö']
    return (
      <div className='project-list'>
        <ListHeader items={headerItems} selected={sort} dir={dir} filter={this.setFilter} sort={this.setSort} />
      </div>
    )
  }
}

export default List