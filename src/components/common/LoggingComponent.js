import React from 'react'
import { Popup, Dropdown } from 'semantic-ui-react'
import { isBoolean, isObject } from 'lodash'

//import { diff } from 'deep-object-diff'
import { useTranslation } from 'react-i18next'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import parse from 'html-react-parser'
import { diff } from 'deep-object-diff'
import { IconTrash } from 'hds-react'

function LoggingComponent(props) {
  const { t } = useTranslation()

  const { infoOptions } = props

  const isSameValue = (oldValue, newValue) => {
    // TODO
    console.log(diff(oldValue, newValue))
    return false
  }

  const latestUpdate =
    infoOptions &&
    infoOptions[0] &&
    t('nav-header.latest-update', { latestUpdate: infoOptions[0].text })

  const isFieldset = value => value && value.search && value.search('fieldset') !== -1

  const getFormattedValue = (value, isFieldSet, name) => {
    // Fieldset
    if (isFieldSet) {
      const fieldSetContent = getFieldSetContent(value, name)

      const hasContent =
        fieldSetContent.length > 0 && fieldSetContent[0] && fieldSetContent[0].length > 0
      return fieldSetContent && hasContent ? fieldSetContent : '-'
    }

    // Normal rich text
    if (value && value.ops) {
      return getRichTextContent(value.ops)
    }

    if (isBoolean(value)) {
      return value ? 'Kyllä' : 'Ei'
    }
    if (isObject(value)) {
      return value.toString()
    }
    return  value ? value.toString() : '-'
  }

  const getRichTextContent = value => {
    const cfg = { encodeHtml: false }
    const converter = new QuillDeltaToHtmlConverter(value, cfg)

    return parse(converter.convert())
  }

  const getFieldSetContent = (value, name) => {
    if (!isObject(value) || value.ops) {
      return getFormattedValue(value, false, name)
    }
    const returnValues = []

    const valueKeys = Object.keys(value)

    valueKeys &&
      valueKeys.map(currentIndex => {
        const currentValue = value[currentIndex]

        if (isObject(currentValue)) {
          returnValues.push(getFieldsetValues(currentValue, currentIndex, name))
        } else {
          returnValues.push(currentValue ? getFormattedValue(currentValue, isFieldset, name) : 'Tyhjä')
        }
        return null
      })
    return returnValues
  }

  const getFieldsetValues = (fieldset, currentIndex, name) => {
    let deleted = false
    if (fieldset['_deleted']) {
      deleted = true
    }
    const returnValues = []

    let fixedIndex = currentIndex
    fixedIndex++

    const keys = Object.keys(fieldset)

    returnValues.push(
      <div key={0} className={`log-item ${deleted ? 'deleted' : ''}`}>
       {deleted && <IconTrash size="s"/> }

        <b>
          {fixedIndex}: {name}
        </b>
        <br />
      </div>
    )

    if (keys.length === 0) {
      returnValues.push('Tyhjä')
    } else {
      keys.forEach((key, index) => {
        let component
        let deleted = false

        if (key !== '_deleted') {
          let value = getFormattedValue(fieldset[key], isFieldset(key), key)

          component = (
            <div key={key + index} className={`log-item ${deleted ? 'deleted' : ''} `}>
              <div>
              {deleted && <IconTrash /> }
                <b>{key}</b>
              </div>
              <div>{value}</div>
            </div>
          )

          returnValues.push(component)
        } else {
          const value = getFormattedValue(fieldset[key], isFieldset(key), key)

          if (value === true) {
            component = (
              <div key={key + index} className={`log-item ${deleted ? 'deleted' : ''} `}>
                <div>
                {deleted && <IconTrash /> }
                  <b>Deleted: </b>
                </div>
                <div>{value}</div>
              </div>
            )
          }

          returnValues.push(component)
        }
      })
    }
    return returnValues.length === 0 ? null : returnValues
  }

  return (
    <div className="nav-header-info">
      <div>
        {latestUpdate && (
          <Dropdown text={latestUpdate} scrolling icon="angle down">
            <Dropdown.Menu>
              {infoOptions &&
                infoOptions.map(option => {
                  if (isSameValue(option.oldValue, option.newValue)) {
                    return null
                  }
                  return (
                    <Popup
                      hideOnScroll={false}
                      offset={[50, 50]}
                      key={option.key}
                      className="popup-logger"
                      position="right center"
                      wide="very"
                      trigger={(
                        <Dropdown.Item
                          key={option.key}
                          className="changelog-item"
                          value={option.value}
                        >
                          {option.text}
                        </Dropdown.Item>
                      )}
                    >
                      <div className="show-value">{option.text}</div>
                      <div className="show-value">
                        <div>
                          <b>Uusi arvo</b>
                        </div>
                        <div className="field-value">
                          {getFormattedValue(
                            option.newValue,
                            isFieldset(option.name),
                            option.name
                          )}
                        </div>
                      </div>
                      <div>
                        <div>
                          <b>Vanha arvo</b>
                        </div>
                        <div className="field-value">
                          {getFormattedValue(
                            option.oldValue,
                            isFieldset(option.name),
                            option.name
                          )}
                        </div>
                      </div>
                    </Popup>
                  )
                })}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  )
}

LoggingComponent.propTypes = {}

export default LoggingComponent

