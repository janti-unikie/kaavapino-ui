import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { isArray } from 'lodash'

function Contacts({ fields }) {
  const { t } = useTranslation()

  const renderField = (field, index) => {
    if (!field.value) {
      return
    }
    let value = field.value
    let completeValue = []

    if (isArray(field.value)) {
      field.value.forEach(current => {
        if (!field.choices) {
          completeValue.push(current)
        } else {
          const choiceValue =
            field.choices && field.choices.find(choice => choice.value === current)
          completeValue.push(choiceValue.label)
        }
      })
      value = completeValue.map( value => <div key={value}>{value}</div>)
    } else {
      if (field.choices) {
        const foundValue =
          field.choices && field.choices.find(choice => choice.value === field.value)
        value = foundValue && foundValue.label
      }
    }
    return (
      <div key={field.label + index}>
        <div>{field.label}</div>
        <div>
          <b>{value}</b>
        </div>
      </div>
    )
  }

  const renderFields = () => {
    return (
      <div>
        <h3>{t('project.contact-title')}</h3>
        {fields &&
          fields.map((field, index) => {
            return renderField(field, index)
          })}
      </div>
    )
  }
  const fieldsComponent = renderFields()

  return <div className="contacts">{fieldsComponent}</div>
}

Contacts.propTypes = {
  fields: PropTypes.array
}

export default Contacts
