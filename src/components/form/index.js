import React from 'react'
import Form from './Form'
import CommentList from './CommentList'
import QuickNav from './QuickNav'

const FormPage = ({ tab, inputs, project, id }) => {
  return (
    <div className='project-input-container'>
      <Form id={id} inputs={ inputs } tab={ tab } />
      <div className='project-input-right'>
        <QuickNav project={project} inputs={ inputs } />
        <CommentList />
      </div>
    </div>
  )
}

export default FormPage