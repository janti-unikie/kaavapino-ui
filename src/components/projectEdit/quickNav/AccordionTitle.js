import React from 'react'
import { AccordionTitle as SUIAccordionTitle } from 'semantic-ui-react'
import { IconAngleDown, IconAngleUp } from 'hds-react'

const AccordionTitle = props => {
  const { activePhase, children, id, index, handleClick, list_prefix } = props
  const isActive = activePhase === id

  const icon = isActive ? <IconAngleUp /> : <IconAngleDown />

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
      {icon}
    </SUIAccordionTitle>
  )
}

export default AccordionTitle
