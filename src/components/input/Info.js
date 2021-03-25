import React from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'hds-react'

const InfoContent = props => (
    <React.Fragment>
      <span className="content">{props.content}</span>
      {props.link && (
        <div>
          <Link to={{ pathname: props.link }} target="_blank">
            Lisäohjeita
          </Link>
        </div>
      )}
    </React.Fragment>
  )

const Info = props => (
  <Tooltip tooltipClassName={props.className} placement="top">
    {<InfoContent content={props.content} link={props.link} />}
  </Tooltip>
)

export default Info
