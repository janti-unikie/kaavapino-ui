import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

function Contacts({ fields }) {

    const { t } = useTranslation()

    const renderField = ( field, index ) => {
        if ( !field.value ) {
            return
        }
        let value = field.value

        if ( field.type === 'choice' ){
            const foundValue =
                field.choices && field.choices.find( current => current.value === field.value)
            value = foundValue.label
        }

        return (
            <div key={field.label + index}>
                <div>{field.label}</div>
                <div><b>{ value}</b></div>
            </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
                <h3>{t('project.contact-title')}</h3>
                { fields && fields.map( (field, index) => {
                    return renderField(field, index )
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

