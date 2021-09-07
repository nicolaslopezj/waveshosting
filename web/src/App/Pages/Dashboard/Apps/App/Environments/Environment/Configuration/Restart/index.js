import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'
import PropTypes from 'prop-types'

export default class Restart extends React.Component {
  static propTypes = {
    appId: PropTypes.string,
    environmentName: PropTypes.string
  }

  render() {
    const params = {
      appId: this.props.appId,
      environmentName: this.props.environmentName
    }
    return (
      <div className={styles.container}>
        <Section
          title="Restart environment"
          description="Restarts the application container server running on each Amazon EC2 instance">
          <div>Restart the application servers</div>
          <br />
          <MutationButton
            mutation="restartEnvironment"
            label="Restart environment"
            message="This will restart the application container server running on each Amazon EC2 instance and will cause downtime"
            title="Restart environment"
            confirmText="Restart"
            params={params}
          />
        </Section>
      </div>
    )
  }
}
