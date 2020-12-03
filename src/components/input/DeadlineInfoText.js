import React from 'react'
const DeadlineInfoText = (props) => {
    return (
    <div className="deadline-info-text">
       {props.label} {props.input.value}
    </div>
    )
}

export default DeadlineInfoText