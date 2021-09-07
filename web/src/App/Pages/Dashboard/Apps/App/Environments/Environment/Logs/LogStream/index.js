import React from 'react'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import PropTypes from 'prop-types'
import Data from './Data'
import Live from './Live'
import Form from './Form'

export default class LogStream extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    live: true
  }

  renderLogs() {
    if (this.state.live) {
      return <Live {...this.props.match.params} startFromHead={false} />
    } else {
      if (!this.state.filter && !this.state.startDate) return
      return (
        <Data
          {...this.props.match.params}
          filter={this.state.filter}
          startDate={this.state.startDate}
        />
      )
    }
  }

  render() {
    const {match} = this.props
    const {logGroupName, environmentName, appId, logStreamName} = match.params
    const prefix = `/aws/elasticbeanstalk/${environmentName}/`
    const groupName = decodeURIComponent(logGroupName)
      .replace(prefix, '')
      .replace('var/log/', '')
      .replace('.log', '')
    return (
      <div className={styles.container}>
        <Breadcrumbs
          useContainer={false}
          past={{
            [`/dashboard/apps/${appId}/${environmentName}/logs`]: 'Logs',
            [`/dashboard/apps/${appId}/${environmentName}/logs/${logGroupName}`]: groupName
          }}>
          {decodeURIComponent(logStreamName)}
        </Breadcrumbs>
        <div className={styles.data}>
          <Form state={this.state} onChange={changes => this.setState(changes)} />
          {this.renderLogs()}
        </div>
      </div>
    )
  }
}
