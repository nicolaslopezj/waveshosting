import React from 'react'
import styles from './styles.css'
import Logo from './Logo'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import Login from './Login'
import Register from './Register'
import VerifyEmail from './VerifyEmail'
import Forgot from './Forgot'
import Reset from './Reset'
import Enroll from './Enroll'
import {Route, Switch, withRouter} from 'react-router-dom'

@withRouter
export default class Auth extends React.Component {
  state = {isLoading: false, error: null}

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    params: PropTypes.object
  }

  @autobind
  onLogin() {
    const {location} = this.props
    if (location.state && location.state.nextPathname) {
      this.props.history.replace(location.state.nextPathname)
    } else {
      this.props.history.replace('/dashboard')
    }
  }

  renderLogo() {
    return (
      <div className={styles.logo}>
        <Logo color="black" isLoading={this.state.isLoading} />
      </div>
    )
  }

  render() {
    const otherProps = {onLogin: this.onLogin}
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentInner}>
            {this.renderLogo()}
            <Switch>
              <Route path="/login" render={() => <Login {...otherProps} />} />
              <Route path="/register" render={() => <Register {...otherProps} />} />
              <Route
                path="/verify-email/:token"
                render={({match}) => <VerifyEmail token={match.params.token} {...otherProps} />}
              />
              <Route path="/forgot" render={() => <Forgot {...otherProps} />} />
              <Route
                path="/reset/:token"
                render={({match}) => <Reset token={match.params.token} {...otherProps} />}
              />
              <Route
                path="/enroll/:token"
                render={({match}) => <Enroll token={match.params.token} {...otherProps} />}
              />
            </Switch>
          </div>
        </div>
        <div className={styles.photo} />
      </div>
    )
  }
}
