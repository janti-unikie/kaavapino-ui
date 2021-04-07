import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {  Popup, Dropdown, Grid } from 'semantic-ui-react'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import parse from 'html-react-parser'
import { isObject, isBoolean, isArray, isString, isNumber } from 'lodash'
import { useTranslation } from 'react-i18next'

export const NavAction = ({ children, to, primary, ...rest }) => {

  const buttonClassname = primary ? 'primary' : 'secondary'
  return to ? (
    <Link className={`action-item ui button large ${buttonClassname}`} to={to}>
      {children}
    </Link>
  ) : (
    <span {...rest} className={`action-item ui button large ${buttonClassname}`}>
      {children}
    </span>
  )
}

NavAction.propTypes = {
  to: PropTypes.string
}

export const NavActions = props => <div className="nav-header-actions" {...props} />

export const NavHeader = ({
  routeItems,
  actions,
  title,
  infoOptions
}) => {
  const { t } = useTranslation()

  const getFormattedValue = value => {

    if (value && value.ops) {
      return getRichTextContent(value.ops)
    }

    if (value && value[0] && isObject(value[0])) {
      const currentValue = value[0]
      const keys = Object.keys(currentValue)

      if (keys && keys.length === 1) {
        const valueObject = currentValue[keys[0]]

        if (valueObject.ops) {
          return getRichTextContent(valueObject.ops)
        }
        // TODO: Fix when fieldsets are working
        return valueObject ? valueObject.toString() : '-'
      }
      if (keys && keys.length > 1) {
        let returnValues = []
        keys.forEach(key => {
          const currentValue = value[0][key]

          if (currentValue && currentValue.ops) {
            return getRichTextContent(currentValue).ops
          }
          returnValues.push(`${key}: ${currentValue}`)
        })

        if (keys && keys.length === 0) {
          return '<Tyhjä>'
        }
        return returnValues.toString()
      }
    }

    if (isBoolean(value)) {
      return value ? 'Kyllä' : 'Ei'
    }
    if (isObject(value)) {
      if (value[0] && (isString(value[0]) || isNumber(value[0]))) {
        return value.toString()
      }
      return '<Muu muutos>'
    }

    return value ? value.toString() : '-'
  }
  const getRichTextContent = value => {
    const cfg = { encodeHtml: false }
    const converter = new QuillDeltaToHtmlConverter(value, cfg)
    return parse(converter.convert())
  }

  const isSameValue = (oldValue, newValue) => {
    if (oldValue && newValue && isArray(oldValue) && isArray(newValue)) {
      return oldValue.toString() === newValue.toString()
    }
    return oldValue === newValue
  }
  const latestUpdate = infoOptions &&
    infoOptions[0] &&
    t('nav-header.latest-update', { latestUpdate:infoOptions[0].text })

  const renderDropdown = infoOptions && infoOptions[0] && (
     <div className="nav-header-info">
      <div>
        <Dropdown text={latestUpdate}  scrolling icon="angle down">
          <Dropdown.Menu>
            {infoOptions && infoOptions.map(option => {
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
                      {getFormattedValue(option.newValue)}
                    </div>
                  </div>
                  <div>
                    <div>
                      <b>Vanha arvo</b>
                    </div>
                    <div className="field-value">
                      {getFormattedValue(option.oldValue)}
                    </div>
                  </div>
                </Popup>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
      )

  return (
    <div className="nav-header-container">
      <div className="nav-header-inner-container">
        <div className="nav-header-route">
          <div className="nav-header-route-items">
            {routeItems.map((item, i) => {
              return (
                <span key={i}>
                  <Link to={item.path}>{item.value}</Link>
                </span>
              )
            })}
          </div>
        </div>
        <div className="nav-header-content">
          <div className="nav-header-titles">
            <Grid className="full-width" stackable padded={false} columns="equal">
             <Grid.Column width={5}>
               <h2 className="nav-header-title">{title}</h2>
             </Grid.Column>
             <Grid.Column textAlign="right">{actions && actions}</Grid.Column>
          </Grid>
          </div>
         {renderDropdown}
        </div>
      </div>
    </div>
  )
}

NavHeader.propTypes = {
  routeItems: PropTypes.array,
  actions: PropTypes.object,
  large: PropTypes.bool,
  title: PropTypes.string
}
