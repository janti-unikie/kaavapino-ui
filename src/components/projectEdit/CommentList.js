import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchComments,
  createComment,
  editComment,
  deleteComment
} from '../../actions/commentActions'
import { commentsSelector, commentsLoadingSelector } from '../../selectors/commentSelector'
import { Form, Input, Button } from 'semantic-ui-react'

/* const mockC = {
  'id': 1,
  'project': 1,
  'user': '<USER_ID>',
  'created_at': '2018-11-28T10:46:25.544418+02:00',
  'modified_at': '2018-11-28T10:46:25.544439+02:00',
  'content': 'My superduper content'
}

const Comment = ({ creator, content, date, time }) => {
  return (
    <div className='comment-container'>
      <span className='comment-header'>{ creator }</span>
      <div className='comment-content'>
        { content }
      </div>
      <div className='comment-footer'>
        <span>{ date }</span>
        <span>{ time }</span>
      </div>
    </div>
  )
} */

class CommentList extends Component {
  state = {
    value: ''
  }

  componentDidMount () {
    this.props.fetchComments(this.props.project)
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  getDate = () => {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`
  }

  getTime = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
  }

  handleSubmit = () => {
    // mockComments = mockComments.concat({ creator: 'Testi Testersson', content: this.state.value, date: this.getDate(), time: this.getTime() })
    this.props.createComment(this.props.project, this.state.value)
    this.setState({ value: '' })
  }

  render () {
    const { comments, commentsLoading } = this.props
    console.log('c', comments)
    return (
      <div className='comment-list-container'>
        <div className='comments'>
          { commentsLoading && <p>Ladataan...</p> }
          { !commentsLoading && comments.length === 0 && <p>Ei kommentteja.</p> }
          { /* mockComments.slice().reverse().map(({ creator, content, date, time }, i) => {
            return <Comment key={i} creator={creator} content={content} date={date} time={time} />
          }) */ }
        </div>
        <div className='comment-submit-container'>
          <Form>
            <Input
              onChange={this.handleChange}
              type='text'
              fluid
              placeholder='Lisää kommentti'
              action={ <Button primary onClick={this.handleSubmit}>Lähetä</Button> }
              value={this.state.value}
            />
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: commentsSelector(state),
  commentsLoading: commentsLoadingSelector(state)
})

const mapDispatchToProps = {
  fetchComments,
  createComment,
  editComment,
  deleteComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)