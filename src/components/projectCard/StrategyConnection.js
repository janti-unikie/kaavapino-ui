import React from 'react'
import PropTypes from 'prop-types'

function StrategyConnection({ fields }) {

    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
            Strategy Connection
                { fields && fields.map( field => {
                    return renderField(field )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="strategy-connection">
            {fieldsComponent}
        </div>
    )
}

StrategyConnection.propTypes = {
    fields: PropTypes.array
}

export default StrategyConnection

