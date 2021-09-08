import React from 'react'
import PropTypes from 'prop-types'
import { split } from 'lodash'
import { useTranslation } from 'react-i18next'

function StrategyConnection({ fields }) {

    const { t } = useTranslation()

    const renderField = ( field ) => {
        let value = field.value

        const values = split(value, ',')

        if ( !values ) {
            return null
        }
        values.sort()

        const elements = values.map( (value, index ) => {

            if ( field.choices ) {
                const choice = field.choices.find( choice => choice.value === value)

                if ( choice ) {
                    value = choice.label
                }
            }
            return <div key={value + index} >{value}</div>
        })

        return (
            <div key={field.name}>
                {elements}
            </div>
        )
    }
   
    const renderFields = () => {
        return (
            <div>
                <h3>{t('project.strategy-connection-title')}</h3>
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

