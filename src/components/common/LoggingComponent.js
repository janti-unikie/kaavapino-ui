import React from 'react'
import { isBoolean, isObject, isArray } from 'lodash'
import { Popup, Grid } from 'semantic-ui-react'
//import { diff } from 'deep-object-diff'
import { useTranslation } from 'react-i18next'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import parse from 'html-react-parser'
import {
  IconTrash,
  Button,
  Card,
  useAccordion,
  IconAngleUp,
  IconAngleDown,
  IconInfoCircle
} from 'hds-react'
import moment from 'moment'
function LoggingComponent(props) {
  const { t } = useTranslation()

  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false })
  const icon = isOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />

  const { infoOptions } = props

  const latestUpdate =
    infoOptions &&
    infoOptions[0] &&
    t('nav-header.latest-update', { latestUpdate: infoOptions[0].text })

  const isFieldset = value => value && value.search && value.search('fieldset') !== -1

  const getFormattedValue = (value, isFieldSet, name, labels) => {
  
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
    // Boolean
    if (isBoolean(value)) {
      return value ? 'Kyllä' : 'Ei'
    }
    // Object which is not fieldset
    if (isObject(value)) {
      const returnValue = []

      // Array
      if (isArray(value)) {
        value.forEach(current => {
          if (labels && Object.keys(labels).length > 0) {
            returnValue.push(labels[current])
          } else {
            returnValue.push(current)
          }
        })
        return returnValue.toString()
      }
      // Image
      if (value && value.link) {
        const keys = Object.keys(value)
        keys.forEach(key => {
          returnValue.push(
            <div key={key}>
              <b>{key}</b>
            </div>
          )
          returnValue.push(<div key={key + value}>{value[key]}</div>)
        })
        return returnValue
      }
      // General
      return value.toString()
    }

    if (labels && Object.keys(labels).length > 0) {
      const foundValue = labels[value]

      return foundValue ? foundValue.toString() : '-'
    }
    return value ? value.toString() : '-'
  }

  const getRichTextContent = value => {
    const cfg = { encodeHtml: false }
    const converter = new QuillDeltaToHtmlConverter(value, cfg)

    return parse(converter.convert())
  }

  const getFieldSetContent = (value, name) => {
    
    // If value is not fieldset
    if (!isObject(value) || value.ops || value.link) {
      return getFormattedValue(value, false, name)
    }
    const returnValues = []

    const valueKeys = Object.keys(value)

    valueKeys &&
      valueKeys.map(currentIndex => {
        const currentValue = value[currentIndex]

        if (isObject(currentValue)) {
          returnValues.push(getFieldsetValues(currentValue, currentIndex, name, isFieldset(name)))
        } else {
          
          returnValues.push(
            currentValue ? getFormattedValue(currentValue, isFieldset, name) : 'Tyhjä'
          )
        }
        return null
      })
    return returnValues
  }
  const findAttribute = key => props && props.attributes.find(attribute => attribute.name === key)

  // Check from field names
  const isValidDate = name => name.lastIndexOf('pvm') !== -1 || name.lastIndexOf('paivamaara') !== -1

  const getFieldsetValues = (fieldset, currentIndex, name) => {
    let deleted = false
    if (fieldset['_deleted']) {
      deleted = true
    }
    const returnValues = []

    let fixedIndex = currentIndex
    fixedIndex++

    const keys = Object.keys(fieldset)

    const foundValue = findAttribute(name)
    const current = foundValue !== undefined ? foundValue.label : name

    returnValues.push(
      <div key={0} className='log-item'>
        {deleted && <IconTrash size="s" />}
        <b>
          {current} {fixedIndex}
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

          const date = moment(value).format('DD.MM.YYYY')
          const foundValue = findAttribute(key)

          const current = foundValue !== undefined ? foundValue.label : key

          component = (
            <div key={key + index} className='log-item'>
              <>
                {deleted && <IconTrash />}
                {!isFieldset(key) && current}
              </>
              <div>{isValidDate(key) ? date !== 'Invalid date' ? date : 'deleted' : value}</div>
            </div>
          )

          returnValues.push(component)
        } else {
          const value = getFormattedValue(fieldset[key], isFieldset(key), key)

          if (value === true) {
            component = (
              <div key={key + index} className='log-item'>
                <div>
                  {deleted && <IconTrash />}
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
      {latestUpdate && <Button className="latest-update" variant="supplementary" iconLeft={icon} {...buttonProps}>
        {latestUpdate}
      </Button>}
      <Card border aria-label="Loki" className="log-card" {...contentProps}>
        <Grid stackable columns="equal">
        {infoOptions &&
          infoOptions.map(option => {
            return (
              <>
                <Grid.Column width={14}> 
                  <div className="show-value">{option.text}</div>
                </Grid.Column>
                <Popup
                  hideOnScroll={false}
                  offset={[50, 50]}
                  key={option.key}
                  on='click'
                  className="popup-logger"
                  position="right center"
                  wide="very"
                  trigger={  <Grid.Column> <IconInfoCircle /> </Grid.Column> }
                >
                  <div className="show-value">
                    <div>
                      <b>{t('projects.logging.modified')}</b>
                    </div>
                    <div className="field-value">
                      {getFormattedValue(
                        option.newValue,
                        isFieldset(option.name),
                        option.name,
                        option.labels
                      )}
                    </div>
                  </div>
                  <div>
                    <div>
                      <b>{t('projects.logging.old')}</b>
                    </div>
                    <div className="field-value">
                      {getFormattedValue(
                        option.oldValue,
                        isFieldset(option.name),
                        option.name,
                        option.labels
                      )}
                    </div>
                  </div>
                </Popup>      
                </>
            )
          })}
          </Grid>
      </Card>
    </div>
  )
}

LoggingComponent.propTypes = {}

export default LoggingComponent
