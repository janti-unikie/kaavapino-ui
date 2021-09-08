import React from 'react'
import PropTypes from 'prop-types'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import parse from 'html-react-parser'
import { isObject } from 'lodash'
import { useTranslation } from 'react-i18next'

function Description({ fields, hideTitle }) {
  const { t } = useTranslation()

  const renderField = (field, index) => {
    const key = field.label + index
    let value = field.value
    if (isObject(field.value)) {
      value = getRichTextContent(field.value.ops)
    }
    return (
      <div key={key}>
        <div>{value} </div>
      </div>
    )
  }
  const getRichTextContent = value => {
    const cfg = { encodeHtml: false }
    const converter = new QuillDeltaToHtmlConverter(value, cfg)
    return parse(converter.convert())
  }
  const renderFields = () => {
    return (
      <div>
        {!hideTitle && <h3>{t('project.description-title')}</h3>}
        {fields &&
          fields.map((field, index) => {
            return renderField(field, index)
          })}
      </div>
    )
  }
  const fieldsComponent = renderFields()

  return <div className="description">{fieldsComponent}</div>
}

Description.propTypes = {
  fields: PropTypes.array
}

export default Description
