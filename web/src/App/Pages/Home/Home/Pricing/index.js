import React from 'react'
import styles from './styles.css'

export default class Pricing extends React.Component {
  static propTypes = {}
  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <h1>Unlimited free tier</h1>
            <p>
              You can have one application in your account without introducing a credit card forever
            </p>
          </div>
          <div className="col-xs-12 col-sm-6">
            <h1>Unlimited for $29</h1>
            <p>Simple pricing, you can get all the features for just $29/month.</p>
          </div>
        </div>
      </div>
    )
  }
}
