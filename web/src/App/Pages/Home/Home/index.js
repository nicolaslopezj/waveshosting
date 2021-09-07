import React from 'react'
import styles from './styles.css'
import Apps from './Apps'
import Features from './Features'
import OpenSource from './OpenSource'
import StaticWebsites from './StaticWebsites'
import Main from './Main'

export default class Home extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Main />
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <Apps />
            <StaticWebsites />
            <Features />
            <OpenSource />
          </div>
        </div>
      </div>
    )
  }
}
