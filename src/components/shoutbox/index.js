import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import './shoutbox.scss'
import Comments from './comments'

const Shoutbox = (props) => {
  const { project } = props

  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  return (
    <div className={`shoutbox ${open ? 'open' : ''}`}>
      <Button className='shoutbox-button' onClick={toggleOpen}>
        <div>Viestit</div>
        <div className="comment-icon" />
      </Button>
      <div className='comment-list-wrapper'>
        <Comments project={project} />
      </div>
    </div>
  )
}

export default Shoutbox
