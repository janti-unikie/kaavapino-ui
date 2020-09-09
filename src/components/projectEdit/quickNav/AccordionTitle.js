import React from 'react'
import { AccordionTitle as SUIAccordionTitle } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const AccordionTitle = props => {
  const { activePhase, children, id, index, handleClick, list_prefix } = props
  const isActive = activePhase === id

  return (
    <SUIAccordionTitle
      active={isActive}
      index={index}
      key={index}
      onClick={() => handleClick(id)}
    >
      <div>
        {list_prefix}. {children}
      </div>
      <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} />
    </SUIAccordionTitle>
  )
}

export default AccordionTitle
