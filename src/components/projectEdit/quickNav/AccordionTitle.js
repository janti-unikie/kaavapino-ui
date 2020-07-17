import React from 'react'
import { AccordionTitle as SUIAccordionTitle } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const AccordionTitle = props => {
  const { activePhase, children, index, handleClick } = props
  const isActive = activePhase === index

  return (
    <SUIAccordionTitle
      active={activePhase === 0}
      index={index}
      onClick={() => handleClick(index)}
    >
      <div>{children}</div>
      <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} />
    </SUIAccordionTitle>
  )
}

export default AccordionTitle
