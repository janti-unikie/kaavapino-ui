import React from 'react'

const ProjectImage = ({ src }) => {
  return (
    <div className='project-image'>
      <img src={src} alt='img' width='600px' height='600px' />
    </div>
  )
}

export default ProjectImage