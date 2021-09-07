import React from 'react'
import styles from './styles.css'
import LoadBalancer from './LoadBalancer'
import PropTypes from 'prop-types'
import InstanceType from './InstanceType'
import DeploymentConfiguration from './DeploymentConfiguration'

export default class Servers extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <InstanceType {...this.props.match.params} />
        <LoadBalancer {...this.props.match.params} />
        <DeploymentConfiguration {...this.props.match.params} />
      </div>
    )
  }
}
