import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

function TimeTable( { fields } ) {

    const { t } = useTranslation()

    const renderField = ( field, index ) => {

        if ( !field.value ) {
            return
        }
        let value = field.value

        if ( field.type === 'date') {
            value = moment( field.value).format('DD.MM.YYYY')
        }
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
                { fields && fields.map( (field, fieldIndex) => {
                    return renderField(field, fieldIndex )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="timetable">
             <h3>{t('project.timetable-title')}</h3>
            {fieldsComponent}
        </div>
    )
}

TimeTable.propTypes = {
    fields: PropTypes.array
}

export default TimeTable

