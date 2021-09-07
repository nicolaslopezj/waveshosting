import React from 'react'
import styles from './styles.css'
import {getSessions, deleteSession} from 'App/helpers/auth/otherSessions'
import PropTypes from 'prop-types'
import {setSession} from '@orion-js/graphql-client'

export default class OtherSessions extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func
  }

  async selectSession(session) {
    deleteSession(session._id)
    await setSession(session)
    this.props.onLogin()
  }

  renderSessions() {
    return getSessions().map(session => {
      return (
        <div
          key={session._id}
          className={styles.session}
          onClick={() => this.selectSession(session)}>
          <div className={styles.name}>{session.user.name}</div>
          <div className={styles.email}>{session.user.email}</div>
        </div>
      )
    })
  }

  render() {
    if (!getSessions().length) return null
    return (
      <div>
        <div className="label">Active sessions</div>
        <div className={styles.container}>{this.renderSessions()}</div>
      </div>
    )
  }
}
