import React from 'react'
import PropTypes from 'prop-types'

function Contract({ fields }) {

    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
            Contract
                { fields && fields.map( field => {
                    return renderField(field )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="contract">
            {fieldsComponent}
        </div>
    )
}

Contract.propTypes = {
    fields: PropTypes.array
}

export default Contract

