import React from 'react'
import PropTypes from 'prop-types'

function Documents({ fields }) {

    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
            Documents
                { fields && fields.map( field => {
                   return renderField(field )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="documents">
            {fieldsComponent}
        </div>
    )
}

Documents.propTypes = {
    fields: PropTypes.array
}

export default Documents

