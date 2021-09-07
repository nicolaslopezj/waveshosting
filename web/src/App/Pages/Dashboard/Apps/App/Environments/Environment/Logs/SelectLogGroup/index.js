import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Section from 'App/components/Section'
import {Link} from 'react-router-dom'
import range from 'lodash/range'
import Activate from '../Activate'

@withGraphQL(
  gql`
    query getEnvironmentLogOptions($appId: ID, $environmentName: String) {
      environment(appId: $appId, environmentName: $environmentName) {
        name
        appId
        cleanName
        app {
          _id
          platform {
            _id
            appLogs
          }
        }
        logsOptions {
          active
          logGroups {
            arn
            name
            logGroupName
          }
        }
      }
    }
  `,
  {loading: null}
)
export default class Select extends React.Component {
  static propTypes = {
    environment: PropTypes.object,
    refetch: PropTypes.func
  }

  state = {showAll: false}

  renderLoading() {
    return range(3).map(index => {
      return <div key={index} className={styles.loading} />
    })
  }

  renderGroups() {
    if (!this.state.showAll) return
    const {environment} = this.props
    if (!environment || !environment.logsOptions) return this.renderLoading()
    const groups = environment.logsOptions.logGroups
    if (!groups || !groups.length) return this.renderLoading()
    return groups.map(group => {
      const to = `/dashboard/apps/${environment.appId}/${
        environment.name
      }/logs/${encodeURIComponent(group.logGroupName)}`
      return (
        <Link key={group.arn} className={styles.group} to={to}>
          {group.name}
        </Link>
      )
    })
  }

  renderMainGroups() {
    if (this.state.showAll) return
    const {environment} = this.props
    if (!environment || !environment.logsOptions) return this.renderLoading()
    const groups = environment.logsOptions.logGroups
    if (!groups || !groups.length) return this.renderLoading()
    return groups
      .filter(group => {
        if (group.name === environment.app.platform.appLogs) return true
        if (group.name === 'eb-activity') return true
        return false
      })
      .map(group => {
        const to = `/dashboard/apps/${environment.appId}/${
          environment.name
        }/logs/${encodeURIComponent(group.logGroupName)}`
        const name =
          group.name === environment.app.platform.appLogs ? 'Application logs' : 'Service logs'
        return (
          <Link key={group.arn} className={styles.group} to={to}>
            {name} ({group.name})
          </Link>
        )
      })
  }

  renderButton() {
    return (
      <a onClick={() => this.setState({showAll: !this.state.showAll})}>
        {this.state.showAll ? 'Show less' : 'Show more'}
      </a>
    )
  }

  render() {
    const {environment} = this.props
    if (environment && environment.logsOptions && !environment.logsOptions.active) {
      return <Activate environment={environment} refetch={this.props.refetch} />
    }
    return (
      <div className={styles.container}>
        <Breadcrumbs useContainer={false}>Logs</Breadcrumbs>
        <Section
          title="Select log group"
          description="Each service in your app streams to a different log group"
          useContainer={false}>
          {this.renderMainGroups()}
          {this.renderGroups()}
          {this.renderButton()}
        </Section>
      </div>
    )
  }
}
