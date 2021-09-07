import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import autobind from 'autobind-decorator'
import Event from '../Logs/Event'

@withGraphQL(
  gql`
    query getFilteredLogEvent(
      $appId: ID
      $environmentName: String
      $logGroupName: String
      $logStreamName: String
      $filter: String
      $startDate: Date
      $nextToken: String
    ) {
      logs: filteredEnvironmentLogs(
        appId: $appId
        environmentName: $environmentName
        logGroupName: $logGroupName
        logStreamName: $logStreamName
        filter: $filter
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
export default class Data extends React.Component {
  static propTypes = {
    logs: PropTypes.object,
    loading: PropTypes.bool,
    networkStatus: PropTypes.number,
    fetchMore: PropTypes.func
  }

  componentDidMount() {
    this.refs.container.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('scroll', this.handleScroll)
  }

  @autobind
  handleScroll() {
    const {scrollHeight, scrollTop, clientHeight} = this.refs.container
    const distanceToBottom = scrollHeight - scrollTop - clientHeight
    if (distanceToBottom < 20) this.fetchMore()
  }

  async fetchMore() {
    if (this.props.loading) return
    if (!this.props.logs.nextToken) return
    await this.props.fetchMore({
      variables: {
        nextToken: this.props.logs.nextToken
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev
        return {
          logs: {
            __typename: fetchMoreResult.logs.__typename,
            nextToken: fetchMoreResult.logs.nextToken,
            items: [...prev.logs.items, ...fetchMoreResult.logs.items]
          }
        }
      }
    })
  }

  isLoadingAll() {
    return this.props.networkStatus === 1
  }

  renderEvents() {
    if (!this.props.logs) return
    if (this.isLoadingAll()) return
    return this.props.logs.items.map(event => {
      return <Event key={event.eventId} event={event} />
    })
  }

  renderLoading() {
    if (!this.props.loading) return
    const count = this.isLoadingAll() ? 10 : 1
    return range(count).map(index => (
      <div key={index} className={styles.loadingLine}>
        <div className={styles.loadingDate} />
        <div className={styles.loadingMessage} />
      </div>
    ))
  }

  renderEnd() {
    if (!this.props.logs) return
    if (this.props.loading) return
    if (this.props.logs.nextToken) return
    return <div className={styles.end}>You have reached the end</div>
  }

  render() {
    return (
      <div className={styles.container} ref="container">
        {this.renderEvents()}
        {this.renderLoading()}
        {this.renderEnd()}
      </div>
    )
  }
}
