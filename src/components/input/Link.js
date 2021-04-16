import React, { useState } from 'react'
import { TextInput } from 'hds-react'
import isUrl from 'is-url'
import ipRegex from 'ip-regex'
import { IconCross, IconCheck, Button, IconLink } from 'hds-react'

const Link = props => {
  const openLink = () => window.open(currentValue)

  const [currentValue, setCurrentValue] = useState(props.input.value)
  const isValid = value => isUrl(value) || ipRegex({ exact: true }).test(value)

  const multipleLinks = props.type === 'select-multiple'

  const isLinkValid = currentValue && isValid(currentValue)

  const onBlur = () => {
    if (isLinkValid) {
      props.onBlur()
    }
  }

  const onChange = event => {
    const value = event.target.value
    if (multipleLinks) {
      value && props.input.onChange(value.split(','))
    } else {
      props.input.onChange(value)
    }

    setCurrentValue(value)
  }
  return (
    <div className="link-container">
      <TextInput
        {...props}
        onBlur={onBlur}
        type="text"
        value={currentValue}
        onChange={onChange}
        className={!isLinkValid && currentValue && !multipleLinks ? 'error' : ''}
      />
      {!multipleLinks && (
        <Button
          className="link-button"
          disabled={!isLinkValid}
          iconLeft={<IconLink />}
          onClick={openLink}
        >
          Avaa
        </Button>
      )}
      {!multipleLinks && currentValue && isLinkValid && (
        <IconCheck className="link-status" size="l" color="green" />
      )}
      {!multipleLinks && !isLinkValid && currentValue && currentValue.length > 0 && (
        <IconCross className="link-status" size="l" color="red" />
      )}
      {!isLinkValid && currentValue && !multipleLinks && (
        <div className="error-text">Link is broken</div>
      )}
    </div>
  )
}

export default Link
