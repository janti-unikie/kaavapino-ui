import React from 'react'
import PropTypes from 'prop-types'

function TimeTable({ fields }) {

    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
            TimeTable
                { fields && fields.map( field => {
                    return renderField(field )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="timetable">
            {fieldsComponent}
        </div>
    )
}

TimeTable.propTypes = {
    fields: PropTypes.array
}

export default TimeTable

