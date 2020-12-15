import React from 'react'
import PropTypes from 'prop-types'

function Photo({ src }) {

    return (
        <div className="photo">
        Photo
            <div>
                <div className="project-image-container">
                    <img className="project-image" src={src} alt="img" />
                </div>
            </div>
        </div>
    )
}

Photo.propTypes = {
    src: PropTypes.string
}

export default Photo

