import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'
import range from 'lodash/range'

@withGraphQL(
  gql`
    query getEnvironment($appId: ID, $environmentName: String) {
      environment(appId: $appId, environmentName: $environmentName) {
        name
        status
        health
        events {
          date
          message
          severity
        }
      }
    }
  `,
  {loading: null, options: {pollInterval: 5000}}
)
export default class Activity extends React.Component {
  static propTypes = {
    environment: PropTypes.object
  }

  renderLoading() {
    return range(10).map(index => (
      <div key={index} className={styles.loadingLine}>
        <div className={styles.loadingDate} />
        <div className={styles.loadingMessage} />
      </div>
    ))
  }

  renderEvents() {
    if (!this.props.environment || !this.props.environment.events) return this.renderLoading()
    return this.props.environment.events.map((event, index) => {
      const date = DateTime.fromISO(event.date).toFormat('y/MM/dd HH:mm:ss')
      const className = [styles.event, styles[event.severity]]
      return (
        <div key={index} className={className.join(' ')}>
          <div className={styles.date}>
            <div className={styles.circle} />
            {date}
          </div>
          <div className={styles.message}>{event.message}</div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className={styles.title}>Latest activity</div>
        <div className={styles.container}>
          <div className={styles.line} />
          <div className={styles.events}>{this.renderEvents()}</div>
        </div>
      </div>
    )
  }
}
