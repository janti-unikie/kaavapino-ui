import React from 'react'
import { Popup, Dropdown } from 'semantic-ui-react'
import { isBoolean, isObject, isString, isNumber } from 'lodash'

//import { diff } from 'deep-object-diff'
import { useTranslation } from 'react-i18next'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import parse from 'html-react-parser'

function LoggingComponent(props) {
  const { t } = useTranslation()

  const { infoOptions } = props

 /* const isSameValue = (oldValue, newValue) => {
    const difference = diff(oldValue, newValue)

    return difference && difference.length === 0
  }*/

  const latestUpdate =
    infoOptions &&
    infoOptions[0] &&
    t('nav-header.latest-update', { latestUpdate: infoOptions[0].text })

  const getFormattedValues = (values, name) => {
    if (isFieldset(name)) {
      return getFormattedValue(values, true)
    }
    return getFormattedValue(values, false)
  }

  const isFieldset = value => value && value.search && value.search('fieldset') !== -1

  const getFormattedValue = (value, isFieldSet) => {
    // Fieldset
    if (isFieldSet) {
      return getFieldSetContent(value)
    }

    // Normal richtext
    if (value && value.ops) {
      return getRichTextContent(value.ops)
    }

    if (isBoolean(value)) {
      return value ? 'Kyllä' : 'Ei'
    }
    if (isObject(value)) {
      if (value[0] && (isString(value[0]) || isNumber(value[0]))) {
        return value.toString()
      }
    }

    return value ? value.toString() : '-'
  }
  const getRichTextContent = value => {
    console.log('🚀 ~ file: NavHeader.js ~ line 67 ~ NavHeader ~ value', value)

    const cfg = { encodeHtml: false }
    const converter = new QuillDeltaToHtmlConverter(value, cfg)

    return parse(converter.convert())
  }
  const getFieldSetContent = value => {
    if (!isObject(value) || value.ops) {
      return getFormattedValue(value)
    }
    const returnValues = []

    const valueKeys = Object.keys(value)
    console.log('🚀 ~ file: NavHeader.js ~ line 79 ~ NavHeader ~ valueKeys', valueKeys)

    valueKeys &&
      valueKeys.map(current => {
        const currentValue = value[current]

        if (isObject(currentValue)) {
       //   const fieldSetData = []
          const keys = Object.keys(currentValue)
          console.log('🚀 ~ file: NavHeader.js ~ line 88 ~ NavHeader ~ keys', keys)

          console.log(
            '🚀 ~ file: NavHeader.js ~ line 93 ~ NavHeader ~ currentValue',
            currentValue
          )
          returnValues.push(getFieldsetValues(currentValue))
        } else {
          console.log(
            '🚀 ~ file: NavHeader.js ~ line 108 ~ NavHeader ~ currentValue',
            currentValue
          )
          returnValues.push(currentValue ? getFormattedValue(currentValue) : 'Tyhjä')
        }
      })

    return returnValues
  }

  const getFieldsetValues = fieldset => {
    const returnValue = []

    const keys = Object.keys(fieldset)
    keys.forEach(key => {
      if (key !== '_deleted') {
        returnValue.push(key + ' ')
        returnValue.push(getFormattedValue(fieldset[key], isFieldset(key)))
      }
    })
    return returnValue
  }

  return (
    <div className="nav-header-info">
      <div>
        {latestUpdate && (
          <Dropdown text={latestUpdate} scrolling icon="angle down">
            <Dropdown.Menu>
              {infoOptions &&
                infoOptions.map(option => {
                 /* if (isSameValue(option.oldValue, option.newValue)) {
                    return null
                  }*/
                  return (
                    <Popup
                      hideOnScroll={false}
                      offset={[50, 50]}
                      key={option.key}
                      className="popup-logger"
                      position="right center"
                      wide="very"
                      trigger={
                        (
                        <Dropdown.Item
                          key={option.key}
                          className="changelog-item"
                          value={option.value}
                        >
                          {option.text}
                        </Dropdown.Item>
                        )
                      }
                    >
                      <div className="show-value">{option.text}</div>
                      <div className="show-value">
                        <div>
                          <b>Uusi arvo</b>
                        </div>
                        <div className="field-value">
                          {getFormattedValues(option.newValue, option.key)}
                        </div>
                      </div>
                      <div>
                        <div>
                          <b>Vanha arvo</b>
                        </div>
                        <div className="field-value">
                          {getFormattedValues(option.oldValue, option.key)}
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
/*keys.forEach(firstKey => {
            if (firstKey !== '_deleted') {
              let value = getFormattedValue(currentValue[firstKey])

              if (value[0]) {
                fieldSetData.push(`${firstKey}: ${value[0]}`)
              } else {
                fieldSetData.push(`${firstKey}: ${value}`)
              }
            }
          })
          const fieldsetKeys = Object.keys(fieldSetData)
          const fieldsetFields = []

          fieldsetKeys.forEach(fieldsetKey => {
            const currentValue = fieldSetData[fieldsetKey]

            if (isObject(currentValue)) {
              fieldsetFields.push(`${fieldsetKey}: ${getFieldsetValues(currentValue)} `)
              console.log(
                '🚀 ~ file: NavHeader.js ~ line 114 ~ NavHeader ~ fieldsetFields',
                fieldsetFields
              )
            }
          })*/
