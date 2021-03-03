import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

function Documents({ fields }) {

    const { t } = useTranslation()
    const renderField = ( field ) => {
        return (
            <div>{field.label} {field.value} </div>
        )
    }
    const renderFields = () => {
        return (
            <div>
                <h3>{t('project.documents-title')}</h3>
                { fields && fields.map( field => {
                   return renderField(field )
                } )
                }
            </div>
            )
    }
    const fieldsComponent = renderFields()

    return (
        <div className="documents">
            {fieldsComponent}
        </div>
    )
}

Documents.propTypes = {
    fields: PropTypes.array
}

export default Documents

