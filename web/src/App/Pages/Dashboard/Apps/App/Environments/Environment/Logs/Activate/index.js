import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'

export default class Activate extends React.Component {
  static propTypes = {
    environment: PropTypes.object,
    refetch: PropTypes.func
  }

  render() {
    const {environment} = this.props
    const params = {
      appId: environment.appId,
      environmentName: environment.name,
      retention: 7
    }
    return (
      <div className={styles.container}>
        <Section
          title="Activate log streaming"
          description="Activate log streaming to view application logs in Waves. Standard CloudWatch charges apply"
          top>
          <div>
            Activate log streaming for <b>{environment.cleanName}</b>?
          </div>
          <br />
          <MutationButton
            mutation="activateLogStreaming"
            label="Activate log streaming"
            message={
              <span>
                This will activate log streaming for <b>{environment.cleanName}</b> with a retention
                of 7 days. Are you sure? Standard CloudWatch charges apply
              </span>
            }
            title="Activate log streaming"
            confirmText="Activate"
            primary
            params={params}
            onSuccess={this.props.refetch}
          />
        </Section>
      </div>
    )
  }
}
