import React, { PureComponent } from 'react'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from './Input'
import isUrl from 'is-url'
import ipRegex from 'ip-regex'

class Link extends PureComponent {
  openLink = () => window.open(this.props.input.value)

  render() {
    const { value } = this.props.input
    const valid = isUrl(value) || ipRegex({ exact: true }).test(value)
    return (
      <div className="link-container">
        <Input type="text" {...this.props} placeholder="http(s)://..." />
        <Button
          className="link-button"
          labelPosition="right"
          disabled={!valid}
          icon="world"
          label={{
            basic: true,
            content: 'Avaa'
          }}
          onClick={this.openLink}
        />
        {valid && <FontAwesomeIcon size="lg" icon="check" color="green" />}
        {!valid && value.length > 0 && (
          <FontAwesomeIcon size="lg" icon="times" color="red" />
        )}
      </div>
    )
  }
}

export default Link
