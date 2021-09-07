import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Certificate from './Certificate'
import Domains from './Domains'

export default class Behavior extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <Domains {...this.props.match.params} />
        <Certificate {...this.props.match.params} />
      </div>
    )
  }
}
