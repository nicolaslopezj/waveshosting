import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'
import PropTypes from 'prop-types'

export default class Rebuild extends React.Component {
  static propTypes = {
    environment: PropTypes.object
  }

  render() {
    const params = {
      appId: this.props.environment.appId,
      environmentName: this.props.environment.name
    }
    return (
      <div className={styles.container}>
        <Section
          title="Rebuild environment"
          description="Deletes and recreates all of the resources (the Auto Scaling group, load balancer, etc.)
          for this environment and forces a restart">
          <div>
            Rebuild the environment <b>{this.props.environment.cleanName}</b>
          </div>
          <br />
          <MutationButton
            mutation="rebuildEnvironment"
            label="Rebuild environment"
            message="This will delete and recreate all of the resources for this environment and force a restart"
            title="Rebuild environment"
            confirmText="Rebuild"
            params={params}
          />
        </Section>
      </div>
    )
  }
}
