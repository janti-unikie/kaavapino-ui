import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../store'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { fetchUsers } from '../actions/userActions'
import { fetchProjects } from '../actions/projectActions'
import { authUserSelector, authUserLoadingSelector } from '../selectors/authSelector'
import { loadingSelector } from '../selectors/projectSelector'
import LoginPage from './auth/Login'
import LogoutPage from './auth/Logout'
import LoginCallbackPage from './auth/LoginCallback'
import LogoutCallbackPage from './auth/LogoutCallback'
import ProtectedRoute from './common/ProtectedRoute'
import ProjectListPage from './projectList'
import ProjectPage from './project'
import Header from './common/Header'
import Footer from './common/Footer'

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.userLoading && nextProps.user) {
      this.props.fetchUsers()
      this.props.fetchProjects()
    }
  }

  render() {
    if (this.props.userLoading || this.props.projectsLoading) {
      return <div />
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
              <Route exact path='/:id/edit' render={({ match }) => <ProjectPage edit id={match.params.id} />} />
              <Footer />
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
  fetchUsers,
  fetchProjects
}

const mapStateToProps = (state) => {
  return {
    user: authUserSelector(state),
    userLoading: authUserLoadingSelector(state),
    projectsLoading: loadingSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)