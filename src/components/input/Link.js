import React, { PureComponent } from 'react'
import { Button } from 'semantic-ui-react'
import Input from './Input'
import isUrl from 'is-url'
import ipRegex from 'ip-regex'
import { IconCross, IconCheck } from 'hds-react'

class Link extends PureComponent {
  openLink = () => window.open(this.props.input.value)

  render() {
    const { value } = this.props.input
    const valid = isUrl(value) || ipRegex({ exact: true }).test(value)
    return (
      <div className="link-container">
        <Input type="text" {...this.props}  />
        <Button
          className="link-button"
          labelPosition="right"
          disabled={!valid}
          icon="world"
          label={{
            basic: true,
            content: 'Avaa',
            style: { padding: '0 16px' }
          }}
          onClick={this.openLink}
        />
        {valid && <IconCheck size="l" color="green" />}
        {!valid && value && value.length > 0 && (
          <IconCross size='l' color="red" />
        )}
      </div>
    )
  }
}

export default Link
