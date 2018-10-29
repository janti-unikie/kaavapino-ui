import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../store'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { fetchUsers } from '../actions/userActions'
import { authUserSelector, authUserLoadingSelector } from '../selectors/authSelector'
import LoginPage from './auth/Login'
import LogoutPage from './auth/Logout'
import LoginCallbackPage from './auth/LoginCallback'
import LogoutCallbackPage from './auth/LogoutCallback'
import ProtectedRoute from './common/ProtectedRoute'
import ProjectListPage from './projectList'
import Header from './common/Header'

class App extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userLoading && this.props.user) {
      this.props.fetchUsers()
    }
  }

  render() {
    if (this.props.userLoading) {
      return <p>Loading user...</p>
    }
    return (
      <div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='/callback' render={() => <LoginCallbackPage />} />
            <Route exact path='/logout'  render={() => <LogoutPage handleLogout={ this.props.logout } /> } />
            <Route path='/logout/callback'  render={() => <LogoutCallbackPage /> } />
            <ProtectedRoute path='/' pred={(this.props.user !== null)} redirect='/login'>
              <Header />
              <Route exact path='/' render={() => <ProjectListPage />} />
            </ProtectedRoute>
          </Switch>
        </ConnectedRouter>
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object,
  userLoading: PropTypes.bool
}

const mapDispatchToProps = {
  logout,
  fetchUsers
}

const mapStateToProps = (state) => {
  return {
    user: authUserSelector(state),
    userLoading: authUserLoadingSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)