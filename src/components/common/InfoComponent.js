import { IconLock } from 'hds-react'
import React from 'react'
import { Grid } from 'semantic-ui-react'

export default function InfoComponent({children}) {
  return (
    <Grid className="info-box">
      <Grid.Column width="1" className="icon-area">
        <IconLock size="s" className="icon" />
      </Grid.Column>
      <Grid.Column width="15" className="content">
       {children}
      </Grid.Column>
    </Grid>
  )
}
