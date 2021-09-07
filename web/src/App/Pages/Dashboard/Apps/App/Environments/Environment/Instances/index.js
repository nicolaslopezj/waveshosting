import React from 'react'
import styles from './styles.css'
import Instances from './Instances'
import PropTypes from 'prop-types'

export default class Health extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  render() {
    const {environmentName, appId} = this.props.match.params
    return (
      <div className={styles.container}>
        <Instances environmentName={environmentName} appId={appId} />
      </div>
    )
  }
}
