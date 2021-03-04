import React, { useState, useRef } from 'react'
import './styles.scss'
import { IconAngleUp, IconAngleDown } from 'hds-react'

const Collapse = props => {
  const { children, title, ...rest } = props
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

  const icon = open ? <IconAngleUp /> : <IconAngleDown />

  return (
    <div className={`collapse ${open ? 'open' : ''}`} {...rest}>
      <h3 className="collapse-header" onClick={handleClick}>
        <div>{title}</div>
        {icon}
      </h3>
      <div ref={contentRef} className="collapse-content">
        {children}
        <div className="bottom-padding-included-in-animation" />
      </div>
    </div>
  )
}

export default Collapse
