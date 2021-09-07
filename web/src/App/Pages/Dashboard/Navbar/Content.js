import React from 'react'
import styles from './styles.css'
import Logo from './Logo'
import Menu from './Menu'
import Sections from './Sections'
import {Link} from 'react-router-dom'

export default class Component extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.flex}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.sections}>
          <Sections />
        </div>
        <a className={styles.referrals} to="/settings/referrals">
          Open Source
        </a>
        <div className={styles.menu}>
          <Menu />
        </div>
      </div>
    )
  }
}
