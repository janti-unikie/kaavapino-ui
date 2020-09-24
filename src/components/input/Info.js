import React, { PureComponent } from 'react'
import { Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class InfoContent extends PureComponent {
  render() {
    const { content, link } = this.props
    return (
      <React.Fragment>
        <span className="content">{content}</span>
        {link && (
          <div>
            <Link to={{ pathname: link }} target="_blank">
              Lisäohjeita
            </Link>
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
        on="click"
        position="top center"
        hoverable={false}
        content={<InfoContent {...this.props} />}
      />
    )
  }
}

export default Info
