import React from 'react'
import moment from 'moment'

const DeadlineInfoText = props => {

    const inputValue = props.input && props.input.value

    // Expect date in value
    let value = inputValue && moment( inputValue ).format('DD.MM.YYYY')

    if ( value === 'Invalid date') {
        value = inputValue ? inputValue : ''
    }
    return (
    <div className="deadline-info-text">
       {props.label} {value}
    </div>
    )
}

export default DeadlineInfoText