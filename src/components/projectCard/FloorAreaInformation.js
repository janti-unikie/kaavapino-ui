import React from 'react'
import PropTypes from 'prop-types'

function FloorAreaInformation({ fields }) {

    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
            FloorAreaInformation
                { fields && fields.map( field => {
                    return renderField(field )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="floor-area-information">
            {fieldsComponent}
        </div>
    )
}

FloorAreaInformation.propTypes = {
    fields: PropTypes.array
}

export default FloorAreaInformation

