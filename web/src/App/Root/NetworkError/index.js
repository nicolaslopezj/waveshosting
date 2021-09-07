import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'

export default class NetworkError extends React.Component {
  static propTypes = {}

  state = {}

  render() {
    return (
      <div className={styles.container}>
        <Container size="small">
          <h1 className={styles.title}>Oops!</h1>
          <p className={styles.text}>It looks like we are having a connection error.</p>
        </Container>
      </div>
    )
  }
}
