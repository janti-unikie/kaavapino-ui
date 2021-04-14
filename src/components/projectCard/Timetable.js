import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { isArray } from 'lodash'

function TimeTable({ fields }) {
  const { t } = useTranslation()

  const renderField = (field, index) => {
    if (!field.value) {
      return
    }
    let value = field.value

    let completeValue = ''

    if (isArray(field.value)) {
      field.value.forEach(current => {
        if (current) {
          completeValue = completeValue + ' ' + moment(current).format('DD.MM.YYYY')
        }
      })
      value = completeValue
    } else {
      if (field.choices) {
        const foundValue =
          field.choices && field.choices.find(current => current.value === field.value)
        value = foundValue.label
      } else {
        value = moment(field.value).format('DD.MM.YYYY')
      }
    }

    return <div key={field.label + index}>{renderFieldValue(field, index, value)}</div>
  }
  const renderFieldValue = (field, index, value) => {
    return field.date_format ? (
      <div key={field.label + index}>
        {field.date_format} <b>{value}</b>
      </div>
    ) : (
      <div key={field.label + index}>
        <div>{field.label}</div>
        <div>
          <b>
            {field.date_format} {value}
          </b>
        </div>
      </div>
    )
  }

  const renderFields = () => {
    return (
      <div>
        {fields &&
          fields.map((field, fieldIndex) => {
            return renderField(field, fieldIndex)
          })}
      </div>
    )
  }
  const fieldsComponent = renderFields()

  return (
    <div className="timetable">
      <h3>{t('project.timetable-title')}</h3>
      {fieldsComponent}
    </div>
  )
}

TimeTable.propTypes = {
  fields: PropTypes.array
}

export default TimeTable
