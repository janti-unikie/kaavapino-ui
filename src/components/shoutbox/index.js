import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import './shoutbox.scss'
import Comments from './comments'

class Shoutbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      newMessages: 0
    }
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open })
  };

  render() {
    const { open } = this.state
    const { project } = this.props

    return (
      <div className={`shoutbox ${open ? 'open' : ''}`}>
        <Button className='shoutbox-button' onClick={this.toggleOpen}>
          <div>Viestit</div>
          <div className="comment-icon" />
        </Button>
        <div className='comment-list-wrapper'>
          <Comments project={project} />
        </div>
      </div>
    )
  }
}

export default Shoutbox
