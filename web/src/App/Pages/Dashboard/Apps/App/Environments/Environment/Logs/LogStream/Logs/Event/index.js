import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'
import autobind from 'autobind-decorator'
import ClosedIcon from 'react-icons/lib/md/keyboard-arrow-right'
import Ansi from 'ansi-to-react'

export default class Event extends React.Component {
  static propTypes = {
    event: PropTypes.object
  }

  state = {}

  @autobind
  toggle() {
    this.setState({showDetails: !this.state.showDetails})
  }

  renderDetails() {
    if (!this.state.showDetails) return
    const {event} = this.props
    return (
      <div className={styles.details}>
        <Ansi>{event.message}</Ansi>
      </div>
    )
  }

  render() {
    const {event} = this.props
    const date = DateTime.fromISO(event.timestamp).toFormat('y/MM/dd HH:mm:ss')
    return (
      <div>
        <div onClick={this.toggle} className={styles.event}>
          <div className={this.state.showDetails ? styles.down : styles.right}>
            <ClosedIcon />
          </div>
          <div className={styles.date}>{date}</div>
          <div className={styles.message}>
            <Ansi>{event.message}</Ansi>
          </div>
        </div>
        {this.renderDetails()}
      </div>
    )
  }
}
