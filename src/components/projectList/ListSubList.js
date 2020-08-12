import React, { Component } from 'react'

class SubList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listOpen: false
    }
  }

  toggleOpen = () => {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen
    }))
  }

  render() {
    const { items, title } = this.props
    const { listOpen } = this.state

    return (
      <div className="project-list-sublist">
        <span className="project-sublist-title" onClick={this.toggleOpen}>
          {title}
        </span>
        {listOpen && <div className="project-sublist-items">{items}</div>}
      </div>
    )
  }
}

export default SubList
