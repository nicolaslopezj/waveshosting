import React from 'react'
import styles from './styles.css'
import Container from 'orionsoft-parts/lib/components/Container'
import Content from './Content'

export default class Navbar extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <Content />
        </Container>
      </div>
    )
  }
}
