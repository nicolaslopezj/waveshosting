import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

export default class DNS extends React.Component {
  static fragment = gql`
    fragment environmentConfigDNS on Environment {
      cname
    }
  `

  static propTypes = {
    environment: PropTypes.object
  }

  render() {
    const {environment} = this.props
    return (
      <div className={styles.container}>
        <Section title="DNS" description="Point the dns to the apps" top>
          <div>Create a record in your DNS to point to this direction</div>
          <br />
          <div className={styles.data}>
            <div className={styles.left}>CNAME</div>
            <div className={styles.right}>{environment.cname}</div>
          </div>
        </Section>
      </div>
    )
  }
}
