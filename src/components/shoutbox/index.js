import React, { useState, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import './shoutbox.scss'
import Comments from './comments'
import { useOutsideClick } from '../../hooks/useOutsideClick'

const Shoutbox = (props) => {
  const { project } = props

  const [open, setOpen] = useState(false)
  const shoutboxRef = useRef(null)
  const toggleOpen = () => setOpen(!open)
  const handleOutsideClick = () => {
    if (open) {
      toggleOpen()
    }
  }

  useOutsideClick(shoutboxRef, handleOutsideClick)

  return (
    <div className={`shoutbox ${open ? 'open' : ''}`} ref={shoutboxRef}>
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
