import React from 'react'
import styles from './styles.css'
import List from './List'
import Section from 'App/components/Section'
import Create from './Create'

export default class Tokens extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Section
          title="Tokens"
          description="Create tokens to use them in waves-cli to deploy your apps">
          <List />
          <Create />
        </Section>
      </div>
    )
  }
}
