import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Point from './Point'
import range from 'lodash/range'

@withGraphQL(
  gql`
    query getMonitoringOverview($appId: ID, $environmentName: ID, $period: String) {
      stats: environmentMonitoringOverview(
        appId: $appId
        environmentName: $environmentName
        period: $period
      ) {
        _id
        label
        unit
        timestamp
        percentage
        seconds
        count
        bytes
      }
    }
  `,
  {loading: null, options: {pollInterval: 5000}}
)
export default class Overview extends React.Component {
  static propTypes = {
    stats: PropTypes.array,
    loading: PropTypes.bool
  }

  renderStats() {
    if (this.props.loading) return
    return (this.props.stats || []).map(stat => {
      return (
        <div key={stat._id} className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
          <Point data={stat} />
        </div>
      )
    })
  }

  renderLoading() {
    if (!this.props.loading) return
    return range(6).map(index => {
      return (
        <div key={index} className="col-xs-12 col-sm-6 col-md-2 col-lg-2">
          <div className={styles.loadingPoint} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          {this.renderLoading()}
          {this.renderStats()}
        </div>
      </div>
    )
  }
}
