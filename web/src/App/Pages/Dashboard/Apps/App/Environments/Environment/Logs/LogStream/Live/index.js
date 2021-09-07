import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Logs from '../Logs'
import autobind from 'autobind-decorator'

@withGraphQL(
  gql`
    query getLiveLogEvents(
      $appId: ID
      $environmentName: String
      $logGroupName: String
      $logStreamName: String
      $startFromHead: Boolean
      $endDate: Date
      $startDate: Date
      $nextToken: String
    ) {
      logs: environmentLogs(
        appId: $appId
        environmentName: $environmentName
        logGroupName: $logGroupName
        logStreamName: $logStreamName
        startFromHead: $startFromHead
        endDate: $endDate
        startDate: $startDate
        nextToken: $nextToken
      ) {
        nextToken
        items {
          eventId
          timestamp
          message
        }
      }
    }
  `,
  {loading: null}
)
export default class LiveLogs extends React.Component {
  static propTypes = {
    logs: PropTypes.object,
    loading: PropTypes.bool,
    networkStatus: PropTypes.number,
    fetchMore: PropTypes.func,
    setPosition: PropTypes.func
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.networkStatus === 1 && this.props.networkStatus !== 1) {
      this.refs.logs.scrollToBottom()
    }
  }

  getLoading() {
    if (this.state.loading) return this.state.loading
    if (this.props.networkStatus === 1) return 'all'
  }

  @autobind
  async onReachTop() {
    if (this.props.loading) return
    this.setState({loading: 'top'})
    await this.props.fetchMore({
      variables: {
        endDate: this.props.logs.items[0].timestamp
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev
        return {
          logs: {
            __typename: fetchMoreResult.logs.__typename,
            nextToken: fetchMoreResult.logs.nextToken,
            items: [...fetchMoreResult.logs.items, ...prev.logs.items]
          }
        }
      }
    })
    this.setState({loading: null})
  }

  @autobind
  async fetchMoreBottom() {
    if (this.props.loading) return
    console.log('reloadings')
    this.setState({loading: 'bottom'})
    await this.props.fetchMore({
      variables: {
        endDate: new Date()
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev
        return fetchMoreResult
      }
    })
    this.setState({loading: null})
  }

  render() {
    const logs = this.props.logs && this.props.logs.items
    return (
      <Logs
        ref="logs"
        logs={logs}
        loading={this.getLoading()}
        onReachTop={this.onReachTop}
        fetchMoreBottom={this.fetchMoreBottom}
      />
    )
  }
}
