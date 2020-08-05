import React, { useState, useRef } from 'react'
import { Button, Responsive } from 'semantic-ui-react'
import './shoutbox.scss'
import Comments from './comments'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { unreadCommentsCountSelector } from '../../selectors/commentSelector'

const ShoutBoxButton = props => (
  <Button className="shoutbox-button" {...props}>
    <div>Viestit</div>
    <div className="comment-icon-container">
      <div className="comment-icon" />
      {!!props.unreadCommentsCount && (
        <div className="unread-comments-count">{props.unreadCommentsCount}</div>
      )}
    </div>
  </Button>
)

const Shoutbox = props => {
  const { project, unreadCommentsCount } = props

  const [open, setOpen] = useState(false)
  const shoutboxRef = useRef(null)
  const toggleOpen = () => setOpen(!open)
  const handleOutsideClick = () => {
    if (open) {
      toggleOpen()
    }
  }

  useOutsideClick(shoutboxRef, handleOutsideClick)

  const countToShow = unreadCommentsCount > 9 ? '!' : unreadCommentsCount

  return (
    <>
      <Responsive
        as={ShoutBoxButton}
        maxWidth={599}
        onClick={toggleOpen}
        unreadCommentsCount={countToShow}
      />
      <div className={`shoutbox ${open ? 'open' : ''}`} ref={shoutboxRef}>
        <Responsive
          as={ShoutBoxButton}
          minWidth={600}
          onClick={toggleOpen}
          unreadCommentsCount={countToShow}
        />
        <div className="comment-list-wrapper">
          <Responsive
            as={'div'}
            maxWidth={599}
            onClick={toggleOpen}
            className="shoutbox-close-icon"
          >
            <FontAwesomeIcon icon={faTimes} />
          </Responsive>
          <Comments project={project} />
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  unreadCommentsCount: unreadCommentsCountSelector(state)
})

export default connect(mapStateToProps, () => {})(Shoutbox)
