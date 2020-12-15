import React from 'react'
import PropTypes from 'prop-types'

function Description({ fields }) {

    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
            Description
                { fields && fields.map( field => {
                    return renderField(field )
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

