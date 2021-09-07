import React from 'react'
import styles from './styles.css'
import Logo from './Logo'
import Menu from './Menu'
import Sections from './Sections'

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
        <a
          className={styles.referrals}
          to="https://github.com/nicolaslopezj/waveshosting"
          target="blank">
          Open Source
        </a>
        <div className={styles.menu}>
          <Menu />
        </div>
      </div>
    )
  }
}
