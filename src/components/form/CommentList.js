import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

let mockComments = [
  { creator: 'Pekka Pekkanen', content: 'Tein muutoksen', date: '05.10.2018' },
  { creator: 'Essi Esimerkki', content: 'Muutin päivämäärää', date: '06.10.2018' },
  { creator: 'Juuso Jussinen', content: 'Jatkan tuota kohtaa myöhemmin', date: '08.10.2018' }
]

const Comment = ({ creator, content, date }) => {
  return (
    <div className='comment-container'>
      <span className='comment-header'>{ creator }</span>
      <div className='comment-content'>
        { content }
      </div>
      <span className='comment-footer'>{ date }</span>
    </div>
  )
}

class CommentList extends Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }
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

  handleSubmit = () => {
    mockComments = mockComments.concat({ creator: 'Testi Testersson', content: this.state.value, date: this.getDate() })
    this.setState({ value: '' })
  }

  render() {
    return (
      <div className='comment-list-container'>
        <div className='comments'>
          { mockComments.slice().reverse().map(({ creator, content, date }, i) => {
            return <Comment key={i} creator={creator} content={content} date={date} />
          }) }
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

export default CommentList