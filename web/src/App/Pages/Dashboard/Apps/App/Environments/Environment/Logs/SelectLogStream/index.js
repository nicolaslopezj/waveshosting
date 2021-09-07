import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Section from 'App/components/Section'
import {Link} from 'react-router-dom'
import range from 'lodash/range'

@withGraphQL(
  gql`
    query getEnvironmentLogStreams($appId: ID, $environmentName: String, $logGroupName: String) {
      instances: environmentInstances(appId: $appId, environmentName: $environmentName) {
        instanceId
      }
      environment(appId: $appId, environmentName: $environmentName) {
        name
        appId
        cleanName
        logsOptions {
          logGroups {
            name
            logGroupName
          }
        }
      }
      environmentLogStreams(
        appId: $appId
        environmentName: $environmentName
        logGroupName: $logGroupName
      ) {
        logStreamName
        arn
      }
    }
  `,
  {loading: null}
)
export default class Select extends React.Component {
  static propTypes = {
    instances: PropTypes.array,
    environment: PropTypes.object,
    match: PropTypes.object,
    environmentLogStreams: PropTypes.array
  }

  state = {}

  isInstances() {
    const {environmentLogStreams} = this.props
    if (!environmentLogStreams) return false
    return !environmentLogStreams.find(stream => !stream.logStreamName.startsWith('i-'))
  }

  renderLoading() {
    return range(3).map(index => {
      return <div key={index} className={styles.loading} />
    })
  }

  renderGroups() {
    const {environment, environmentLogStreams, match} = this.props
    const {logGroupName} = match.params
    if (!environment) return this.renderLoading()
    if (!environmentLogStreams || !environmentLogStreams.length) return this.renderLoading()
    return environmentLogStreams
      .filter(stream => {
        if (!this.isInstances()) return true
        if (this.state.showAll) return true
        const instancesIds = this.props.instances.map(i => i.instanceId)
        return instancesIds.includes(stream.logStreamName)
      })
      .map(stream => {
        const to = `/dashboard/apps/${environment.appId}/${
          environment.name
        }/logs/${logGroupName}/${encodeURIComponent(stream.logStreamName)}`
        return (
          <Link key={stream.arn} className={styles.stream} to={to}>
            {stream.logStreamName}
          </Link>
        )
      })
  }

  renderButton() {
    if (!this.isInstances()) return
    return (
      <a onClick={() => this.setState({showAll: !this.state.showAll})}>
        {this.state.showAll ? 'Show active instances' : 'Show all instances'}
      </a>
    )
  }

  render() {
    const {match} = this.props
    const {logGroupName, environmentName, appId} = match.params
    const prefix = `/aws/elasticbeanstalk/${environmentName}/`
    const name = decodeURIComponent(logGroupName)
      .replace(prefix, '')
      .replace('var/log/', '')
      .replace('.log', '')
    return (
      <div className={styles.container}>
        <Breadcrumbs
          useContainer={false}
          past={{
            [`/dashboard/apps/${appId}/${environmentName}/logs`]: 'Logs'
          }}>
          {name}
        </Breadcrumbs>
        <Section
          title="Select log group"
          description="Each service in your app streams to a different log group"
          useContainer={false}>
          {this.renderGroups()}
          {this.renderButton()}
        </Section>
      </div>
    )
  }
}
