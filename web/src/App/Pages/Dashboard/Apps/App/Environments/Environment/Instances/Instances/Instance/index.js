import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import moment from 'moment'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import numeral from 'numeral'

export default class Instance extends React.Component {
  static propTypes = {
    instance: PropTypes.object
  }

  renderRequestsPerSecond() {
    const {instance} = this.props
    const {duration, requestCount, statusCodes} = instance.applicationMetrics
    if (!statusCodes) {
      return (
        <div className={styles.statsItem}>
          <Tooltip content="Data is not available">
            <div className={styles.statsTitle}>Req/sec</div>
            <div className={styles.statsValue}>N/A</div>
          </Tooltip>
        </div>
      )
    }

    const {status2xx, status3xx, status4xx, status5xx} = statusCodes

    const format = val => numeral(val / requestCount).format('0,0%')
    const content = requestCount
      ? `By status code\n200: ${format(status2xx)} - 300: ${format(status3xx)} - 400: ${format(
          status4xx
        )} -  500: ${format(status5xx)}`
      : 'No requests'
    return (
      <div className={styles.statsItem}>
        <Tooltip content={content}>
          <div className={styles.statsTitle}>Req/sec</div>
          <div className={styles.statsValue}>
            {numeral(requestCount / duration).format('0,0.[000]')}
          </div>
        </Tooltip>
      </div>
    )
  }

  renderLatency() {
    const {instance} = this.props
    const {latency, requestCount} = instance.applicationMetrics
    if (!latency) {
      return (
        <div className={styles.statsItem}>
          <Tooltip content="Data is not available">
            <div className={styles.statsTitle}>Latency</div>
            <div className={styles.statsValue}>N/A</div>
          </Tooltip>
        </div>
      )
    }

    const {p999, p99, p95, p90, p85, p75, p50, p10} = latency

    const format = val => numeral(val).format('0,0.[000]')
    const content = requestCount
      ? `Latency
p999: ${format(p999)} - p99: ${format(p99)} - p95: ${format(p95)} - p90: ${format(
          p90
        )} - p85: ${format(p85)} - p75: ${format(p75)} - p50: ${format(p50)} - p10: ${format(p10)}
      `
      : 'No data'
    return (
      <div className={styles.statsItem}>
        <Tooltip content={content}>
          <div className={styles.statsTitle}>Latency</div>
          <div className={styles.statsValue}>{format(p50)}</div>
        </Tooltip>
      </div>
    )
  }

  renderCPU() {
    const {instance} = this.props
    const {cpuUtilization} = instance.system
    if (!cpuUtilization) {
      return (
        <div className={styles.statsItem}>
          <Tooltip content="Data is not available">
            <div className={styles.statsTitle}>CPU</div>
            <div className={styles.statsValue}>N/A</div>
          </Tooltip>
        </div>
      )
    }

    const {user, system, idle} = cpuUtilization
    const format = val => numeral(val).format('0,0.[000]%')
    const content = `User: ${format(user)} - System: ${format(system)} - Idle: ${format(idle)}`

    return (
      <div className={styles.statsItem}>
        <Tooltip content={content}>
          <div className={styles.statsTitle}>CPU</div>
          <div className={styles.statsValue}>{format(1 - idle)}</div>
        </Tooltip>
      </div>
    )
  }

  renderCauses() {
    const {causes} = this.props.instance
    if (!causes || !causes.length) return
    return causes.map((cause, index) => {
      return (
        <div key={index} className={styles.cause}>
          {cause}
        </div>
      )
    })
  }

  render() {
    const {instance} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.instanceId}>{instance.instanceId}</div>
            <div className={styles.instanceType}>
              {instance.instanceType}, {instance.availabilityZone}, launched{' '}
              {moment(instance.launchedAt).fromNow()}
            </div>
          </div>
          <div className={styles.health} style={{background: instance.color}} />
        </div>
        <div className={styles.stats}>
          {this.renderRequestsPerSecond()}
          {this.renderLatency()}
          {this.renderCPU()}
        </div>
        {this.renderCauses()}
      </div>
    )
  }
}
