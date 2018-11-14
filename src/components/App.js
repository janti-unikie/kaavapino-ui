import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../store'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { fetchUsers } from '../actions/userActions'
import { fetchPhases } from '../actions/phaseActions'
import { fetchProjectTypes } from '../actions/projectTypeActions'
import { authUserSelector, authUserLoadingSelector } from '../selectors/authSelector'
import { phasesSelector } from '../selectors/phaseSelector'
import LoginPage from './auth/Login'
import LogoutPage from './auth/Logout'
import LoginCallbackPage from './auth/LoginCallback'
import LogoutCallbackPage from './auth/LogoutCallback'
import ProtectedRoute from './common/ProtectedRoute'
import ProjectListPage from './projectList'
import ProjectPage from './project'
import ErrorPage from './error'
import Header from './common/Header'
import Footer from './common/Footer'

class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.props.fetchUsers()
      this.props.fetchPhases()
      this.props.fetchProjectTypes()
    }
  }

  render() {
    if (this.props.userLoading) {
      return <div />
    }
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/login' render={() => <LoginPage />} />
          <Route path='/callback' render={() => <LoginCallbackPage />} />
          <Route exact path='/logout'  render={() => <LogoutPage handleLogout={ this.props.logout } /> } />
          <Route path='/logout/callback'  render={() => <LogoutCallbackPage /> } />
          <ProtectedRoute path='/' pred={(this.props.user !== null)} redirect='/login'>
            <Header />
            <Switch>
              <Route exact path='/' render={() => <ProjectListPage />} />
              <Route exact path='/:id' render={({ match }) => <ProjectPage id={match.params.id} />} />
              <Route exact path='/:id/edit' render={({ match }) => <ProjectPage edit id={match.params.id} />} />
              <Route exact path='/:id/documents' render={({ match }) => <ProjectPage documents id={match.params.id} />} />
              <Route exact path='/error/:code' component={ErrorPage} />
              <Redirect to='/error/404' />
            </Switch>
            <Footer />
          </ProtectedRoute>
        </Switch>
      </ConnectedRouter>
    )
  }
}

App.propTypes = {
  user: PropTypes.object,
  userLoading: PropTypes.bool
}

const mapDispatchToProps = {
  logout,
  fetchUsers,
  fetchPhases,
  fetchProjectTypes
}

const mapStateToProps = (state) => {
  return {
    user: authUserSelector(state),
    userLoading: authUserLoadingSelector(state),
    phases: phasesSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)