import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default class TransferRequest extends React.Component {
  static propTypes = {
    appId: PropTypes.string
  }

  render() {
    return (
      <Link to={`/dashboard/apps/transfer/${this.props.appId}`} className={styles.container}>
        You have a transfer request for the app <b>{this.props.appId}</b>
      </Link>
    )
  }
}
