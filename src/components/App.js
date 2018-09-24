import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestValue } from '../actions/exampleActions'
import { exampleValueSelector } from '../selectors/exampleSelector'
import Button from './common/Button'

class App extends Component {
  handleClick = () => this.props.requestValue()

  render = () => {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' render={() => {
              return (
                <div>
                  <p className='current-value'>{this.props.value}</p>
                  <Button value='request new value' handleClick={this.handleClick} />
                </div>
              )
            }} />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    value: exampleValueSelector(state)
  }
}

const mapDispatchToProps = {
  requestValue
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
