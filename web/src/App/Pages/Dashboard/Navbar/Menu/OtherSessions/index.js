import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import switchSession from 'App/helpers/auth/switchSession'
import {withRouter} from 'react-router'
import {getSessions} from 'App/helpers/auth/otherSessions'

@withRouter
export default class OtherSessions extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    me: PropTypes.object
  }

  async selectSession(session) {
    this.props.history.replace('/dashboard')
    await switchSession(session, this.props.me)
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
        <div className={styles.container}>{this.renderSessions()}</div>
      </div>
    )
  }
}
