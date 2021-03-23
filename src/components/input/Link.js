import React from 'react'
import Input from './CustomInput'
import isUrl from 'is-url'
import ipRegex from 'ip-regex'
import { IconCross, IconCheck, Button, IconLink } from 'hds-react'

const Link = props => {
  const openLink = () => window.open(props.input.value)

  const { value } = props.input
  const valid = isUrl(value) || ipRegex({ exact: true }).test(value)

  return (
    <div className="link-container">
      <Input
        type="text"
        {...props}
      />
      <Button
        className="link-button"
        disabled={!valid}
        iconLeft={<IconLink />}
        onClick={openLink}
      >
        Avaa
      </Button>
      {valid && <IconCheck className="link-status" size="l" color="green" />}
      {!valid && value && value.length > 0 && (
        <IconCross className="link-status" size="l" color="red" />
      )}
    </div>
  )
}

export default Link
