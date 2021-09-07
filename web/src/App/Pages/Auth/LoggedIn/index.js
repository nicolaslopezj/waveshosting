import React from 'react'
import styles from './styles.css'
import Button from 'orionsoft-parts/lib/components/Button'
import logout from 'App/helpers/auth/logout'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'

@withRouter
export default class Logout extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  async logout() {
    await logout()
  }

  render() {
    return (
      <div className={styles.container}>
        <p>You are already logged in, please log out first</p>
        <Button onClick={() => this.props.history.push('/')}>Go Home</Button>
        <Button onClick={this.logout} danger>
          Sign out
        </Button>
      </div>
    )
  }
}
