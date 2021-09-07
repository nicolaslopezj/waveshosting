import React from 'react'
import styles from './styles.css'
import Password from './Password'
import TwoFactor from './TwoFactor'
import Tokens from './Tokens'

export default class Security extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <TwoFactor />
        <Tokens />
        <Password />
      </div>
    )
  }
}
