import React from 'react'
import Form from './Form'
import CommentList from './CommentList'
import QuickNav from './QuickNav'

const FormPage = ({ tab, inputs }) => {
  return (
    <div className='project-input-container'>
      <Form inputs={ inputs } tab={ tab } />
      <div className='project-input-right'>
        <QuickNav inputs={ inputs } />
        <CommentList />
      </div>
    </div>
  )
}

export default FormPage