import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'

export default class Details extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Section title="Details" description="">
          hola
        </Section>
      </div>
    )
  }
}
