import React from 'react'
import styles from './styles.css'
import {Link} from 'react-router-dom'

export default class Footer extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className="row center-xs">
            {/* <div className="col-xs-12 col-sm-4">
              <h3>Company</h3>
              <a href="https://orionsoft.io" target="_blank" rel="noopener noreferrer">
                Orionsoft
              </a>
              <a href="https://orionjs.com" target="_blank" rel="noopener noreferrer">
                Orionjs
              </a>
            </div> */}
            <div className="col-xs-12 col-sm-4">
              <h3>Sites</h3>
              <a href="https://support.waveshosting.com" target="_blank" rel="noopener noreferrer">
                Help center
              </a>
              <a
                href="https://support.waveshosting.com/getting-started"
                target="_blank"
                rel="noopener noreferrer">
                Getting started
              </a>
              <a
                href="https://github.com/nicolaslopezj/waveshosting"
                target="_blank"
                rel="noopener noreferrer">
                Open Source Code
              </a>
              {/* <a target="_blank" rel="noopener noreferrer">
                Terms and conditions
              </a> */}
            </div>
            <div className="col-xs-12 col-sm-4">
              <h3>Account</h3>
              <Link to="/settings">Settings</Link>
              <Link to="/settings/billing">Billing</Link>
              <Link to="/settings/security">Security</Link>
            </div>
          </div>
          <div className={styles.logo}>
            <img src="/white.svg" alt="Logo" />
          </div>
        </div>
      </div>
    )
  }
}
