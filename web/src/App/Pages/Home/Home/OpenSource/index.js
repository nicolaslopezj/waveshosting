import React from 'react'
import styles from './styles.css'
import Button from 'orionsoft-parts/lib/components/Button'

export default class Pricing extends React.Component {
  static propTypes = {}
  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          <div className="col-xs-12 col-sm-3" />
          <div className="col-xs-12 col-sm-6">
            <h1>Open Source</h1>
            <p>Waves hosting is now open source</p>
            <p>
              <Button
                primary
                onClick={() => window.open('https://github.com/nicolaslopezj/waveshosting')}>
                Github
              </Button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
