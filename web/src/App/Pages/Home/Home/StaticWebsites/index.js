import React from 'react'
import styles from './styles.css'
import example from './example.png'

export default class Frameworks extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <img src={example} alt="example" />
          </div>
          <div className="col-xs-12 col-sm-6">
            <h1>Static websites</h1>
            <p>
              Setup your website easily and serve it through an excellent content delivery network
              at a very low cost.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
