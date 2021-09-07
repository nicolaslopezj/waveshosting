import React from 'react'
import styles from './styles.css'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'

@withRouter
export default class Dashboard extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    const {appId, environmentName} = this.props.match.params
    this.props.history.replace(`/dashboard/apps/${appId}/${environmentName}/monitoring`)
    return <div className={styles.container}>Dashboard</div>
  }
}
