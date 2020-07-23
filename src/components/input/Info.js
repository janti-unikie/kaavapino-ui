import React, { PureComponent } from 'react'
import { Popup } from 'semantic-ui-react'

class InfoContent extends PureComponent {
  render() {
    const { content, link } = this.props
    return (
      <React.Fragment>
        <span className="content">{content}</span>
        {link && (
          <div>
            <a href={`${link}`} target="_blank" rel="noopener noreferrer">
              Lisäohjeita
            </a>
          </div>
        )}
      </React.Fragment>
    )
  }
}

class Info extends PureComponent {
  render() {
    return (
      <Popup
        trigger={<div className="input-info" />}
        inverted
        on="hover"
        position="top center"
        hideOnScroll
        content={<InfoContent {...this.props} />}
      />
    )
  }
}

export default Info
