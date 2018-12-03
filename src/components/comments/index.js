import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchComments,
  createComment,
  editComment,
  deleteComment
} from '../../actions/commentActions'
import { commentsSelector, commentsLoadingSelector } from '../../selectors/commentSelector'
import { userIdSelector } from '../../selectors/authSelector'
import { Form, Input, Button } from 'semantic-ui-react'
import Comment from './Comment'

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.commentsRef = React.createRef()
    this.state = {
      value: ''
    }
  }

  componentDidMount () {
    this.props.fetchComments(this.props.project)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comments.length < this.props.comments.length) {
      const comments = this.commentsRef.current
      if (comments) {
        comments.scrollTop = comments.scrollHeight
      }
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = () => {
    if (this.state.value.trim()) {
      this.props.createComment(this.props.project, this.state.value)
      this.setState({ value: '' })
    }
  }

  render () {
    const { comments, commentsLoading, userId } = this.props
    return (
      <div className='comment-list-container'>
        <div className='comments' ref={this.commentsRef}>
          { commentsLoading && <p className='comments-message'>Ladataan...</p> }
          { !commentsLoading && comments.length === 0 && <p className='comments-message'>Ei kommentteja.</p> }
          { comments.map((comment) => (
            <Comment
              key={comment.id}
              { ...comment }
              editable={userId === comment.user}
              onSave={(content) => this.props.editComment(this.props.project, comment.id, content)}
              onDelete={() => this.props.deleteComment(this.props.project, comment.id)}
            />
          )) }
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
  commentsLoading: commentsLoadingSelector(state),
  userId: userIdSelector(state)
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