import React from 'react'
import styles from './styles.css'
import {Link} from 'react-router-dom'

export default class NotFound extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <p>Page not found</p>
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    )
  }
}
