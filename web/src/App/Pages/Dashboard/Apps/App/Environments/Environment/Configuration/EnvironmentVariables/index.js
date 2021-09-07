import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'
import Form from './Form'

export default class EnvironmentVariables extends React.Component {
  static fragment = gql`
    fragment environmentConfigEnvironmentVariables on Environment {
      name
      appId
    }
  `

  static propTypes = {
    environment: PropTypes.object
  }

  state = {edit: false}

  renderButton() {
    if (this.state.edit) return
    return (
      <Button primary onClick={() => this.setState({edit: true})}>
        Show environment variables
      </Button>
    )
  }

  renderForm() {
    if (!this.state.edit) return
    return (
      <Form environmentName={this.props.environment.name} appId={this.props.environment.appId} />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Section title="Environment variables" description="Set the app environment variables">
          <div>Set the app environment variables</div>
          <br />
          {this.renderButton()}
          {this.renderForm()}
        </Section>
      </div>
    )
  }
}
