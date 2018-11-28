import React, { PureComponent } from 'react'
import { Popup } from 'semantic-ui-react'

class Info extends PureComponent {
  render() {
    const { content } = this.props
    return (
      <Popup
        trigger={<span className='input-info'>?</span>}
        content={content}
        inverted
        position='top center'
      />
    )
  }
}

export default Info