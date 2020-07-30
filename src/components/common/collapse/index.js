import React, { useState, useRef } from 'react'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Collapse = props => {
  const { children, title } = props
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  const handleClick = () => {
    setOpen(!open)
    var content = contentRef.current
    if (!content) {
      return
    }
    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'
    }
  }

  return (
    <div className={`collapse ${open ? 'open' : ''}`}>
      <h2 className="collapse-header" onClick={handleClick}>
        <div>{title}</div>
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      </h2>
      <div ref={contentRef} className="collapse-content">
        {children}
        <div className="bottom-padding-included-in-animation" />
      </div>
    </div>
  )
}

export default Collapse
