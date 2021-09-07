import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Instance from './Instance'
import range from 'lodash/range'

@withGraphQL(
  gql`
    query getEnvironmentInstances($appId: ID, $environmentName: String) {
      instances: environmentInstances(appId: $appId, environmentName: $environmentName) {
        instanceId
        launchedAt
        healthStatus
        color
        instanceType
        availabilityZone
        causes
        deployment {
          versionLabel
        }
        applicationMetrics {
          duration
          requestCount
          statusCodes {
            status2xx
            status3xx
            status4xx
            status5xx
          }
          latency {
            p999
            p99
            p95
            p90
            p85
            p75
            p50
            p10
          }
        }
        system {
          cpuUtilization {
            user
            system
            idle
          }
        }
      }
    }
  `,
  {loading: null, options: {pollInterval: 8000}}
)
export default class Instances extends React.Component {
  static propTypes = {
    instances: PropTypes.array
  }

  renderLoading() {
    return range(3).map(index => {
      return (
        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
          <div className={styles.loading} />
        </div>
      )
    })
  }

  renderInstances() {
    if (!this.props.instances) return this.renderLoading()
    if (!this.props.instances.length) return
    return this.props.instances.map(instance => {
      return (
        <div className="col-xs-12 col-sm-6 col-md-4" key={instance.instanceId}>
          <Instance instance={instance} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="row">{this.renderInstances()}</div>
      </div>
    )
  }
}
