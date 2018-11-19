import React from 'react'

const ProjectImage = ({ src }) => {
  return (
    <div className='project-image-container'>
      <img className='project-image' src={src ? src : '/hankekuva.png'} alt='img' />
    </div>
  )
}

export default ProjectImage