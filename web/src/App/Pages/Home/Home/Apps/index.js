import React from 'react'
import styles from '../StaticWebsites/styles.css'
import example from './example.png'

export default class MainDescription extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          <div className="col-xs-12 col-sm-6 last-sm">
            <img src={example} alt="example" />
          </div>
          <div className="col-xs-12 col-sm-6">
            <h1>Server apps</h1>
            <p>
              Deploy server applications in a managed hosting platform with monitoring, scaling,
              logs and more.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
