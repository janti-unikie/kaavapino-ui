import React from 'react'
import PropTypes from 'prop-types'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import parse from 'html-react-parser'
import { isObject } from 'lodash'

function Description({ fields }) {

    const renderField = ( field, index ) => {
        const key = field.label + index
        let value = field.value
        if ( isObject( field.value ) ) {
            value = getRichTextContent( field.value.ops )
        }
        return (
            <div key={key}>
                <h3>{field.label}</h3>
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
                { fields && fields.map( (field, index) => {
                    return renderField(field, index )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="description">
            {fieldsComponent}
        </div>
    )
}

Description.propTypes = {
    fields: PropTypes.array
}

export default Description

