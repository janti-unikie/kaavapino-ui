import React from 'react'
import PropTypes from 'prop-types'

function FloorAreaInformation({ fields }) {

    const renderField = ( field, index ) => {
        if ( field.unit === 'k-m2') {
            return (
                <div key={field.label + index}>{field.label} {field.value} k-m&sup2;</div>
            )
        } else {
            return (
                <div key={field.label + index}>{field.label} {field.value} {field.unit}</div>
            )
        }
    }
    const renderFields = () => {
        return (
            <div>
            <h3>Kerrosalatiedot</h3>
                { fields && fields.map( (field, index) => {
                    return renderField(field, index )
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

