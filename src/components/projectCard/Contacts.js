import React from 'react'
import PropTypes from 'prop-types'

function Contacts({ fields }) {

    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
             Contact
                { fields && fields.map( field => {
                    return renderField(field )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="contacts">
            {fieldsComponent}
        </div>
    )
}

Contacts.propTypes = {
    fields: PropTypes.array
}

export default Contacts

