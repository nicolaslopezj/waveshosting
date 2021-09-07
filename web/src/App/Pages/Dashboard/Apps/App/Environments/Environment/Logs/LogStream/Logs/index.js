import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import autobind from 'autobind-decorator'
import Event from './Event'

// const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export default class Logs extends React.Component {
  static propTypes = {
    logs: PropTypes.array,
    loading: PropTypes.string,
    onReachBottom: PropTypes.func,
    onReachTop: PropTypes.func,
    fetchMoreBottom: PropTypes.func
  }

  state = {}

  scrollToBottom() {
    this.refs.container.scrollTo(0, this.refs.container.scrollHeight)
  }

  componentDidMount() {
    this.refs.container.addEventListener('scroll', this.handleScroll)
    this.interval = setInterval(this.fetchMore, 5000)
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('scroll', this.handleScroll)
    clearInterval(this.interval)
  }

  @autobind
  fetchMore() {
    console.log('fetching more', this.state)
    if (this.state.position === 'bottom' && this.props.fetchMoreBottom) {
      this.props.fetchMoreBottom()
    }
  }

  setPosition(position) {
    if (this.state.position === position) return
    this.setState({position})
  }

  onReachBottom() {
    if (!this.props.onReachBottom) return
    this.props.onReachBottom()
  }

  async onReachTop() {
    if (!this.props.onReachTop) return
    const {scrollHeight, scrollTop} = this.refs.container
    await this.props.onReachTop()
    this.refs.container.scrollTo(0, scrollTop + this.refs.container.scrollHeight - scrollHeight)
  }

  @autobind
  handleScroll() {
    if (this.props.loading) return
    if (this.state.loading) return
    const {scrollHeight, scrollTop, clientHeight} = this.refs.container
    const distanceToBottom = scrollHeight - scrollTop - clientHeight
    if (distanceToBottom < 20) {
      this.onReachBottom()
    }
    if (scrollTop < 20) {
      this.onReachTop()
    }

    if (distanceToBottom < 2) {
      this.setPosition('bottom')
    } else if (scrollTop < 2) {
      this.setPosition('top')
    } else {
      this.setPosition(null)
    }
  }

  loadsBottom() {
    return !!this.props.onReachBottom || !!this.props.fetchMoreBottom
  }

  loadsTop() {
    return !!this.props.onReachTop
  }

  renderEvents() {
    if (!this.props.logs) return
    if (this.props.loading === 'all') return
    return this.props.logs.map(event => {
      return <Event key={event.eventId} event={event} />
    })
  }

  renderLoading(section) {
    const isLoading = this.props.loading === section
    if (section === 'top' && !this.loadsTop()) return
    if (section === 'bottom' && !this.loadsBottom()) return
    return (
      <div className={isLoading ? styles.loadingLine : styles.nonLoadingLine}>
        <div className={styles.loadingDate} />
        <div className={styles.loadingMessage} />
      </div>
    )
  }

  renderLoadingAll() {
    if (this.props.loading !== 'all') return
    const count = 10
    return range(count).map(index => (
      <div key={index} className={styles.loadingLine}>
        <div className={styles.loadingDate} />
        <div className={styles.loadingMessage} />
      </div>
    ))
  }

  render() {
    return (
      <div className={styles.container} ref="container">
        {this.renderLoadingAll()}
        {this.renderLoading('top')}
        {this.renderEvents()}
        {this.renderLoading('bottom')}
      </div>
    )
  }
}
