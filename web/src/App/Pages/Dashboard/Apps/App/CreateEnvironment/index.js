import React from 'react'
import styles from './styles.css'
import Header from '../Header'
import Section from 'App/components/Section'
import AutoForm from 'App/components/AutoForm'
import Fields from 'orionjs-react-autoform/lib/Fields'
import Button from 'orionsoft-parts/lib/components/Button'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import {Field} from 'simple-react-form'
import Content from 'App/components/Content'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import LoadingSection from 'App/components/LoadingSection'
import NewVersionHelp from './NewVersionHelp'
import ObjectField from 'App/components/fields/ObjectField'
import EnvironmentVariables from 'App/Pages/Dashboard/Apps/App/Environments/Environment/Configuration/EnvironmentVariables/Form/EnvironmentVariables'

@withRouter
@withGraphQL(
  gql`
    query getPlatform($appId: ID) {
      app(appId: $appId) {
        _id
        versions {
          value: label
          label: label
        }
        platform {
          _id
          name
          createParams
          basicEnvironmentVariablesParams
          defaultOptions(appId: $appId)
        }
      }
    }
  `,
  {loading: null}
)
export default class Create extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    app: PropTypes.object,
    loading: PropTypes.bool
  }

  getSteps() {
    return [
      {title: 'Environment Configuration'},
      {title: `${this.props.app.platform.name} Configuration`}
    ]
  }

  getSchema() {
    const schema = {
      appId: {
        type: 'ID'
      },
      versionLabel: {
        type: String,
        label: 'Version'
      },
      environmentName: {
        type: String,
        label: 'Environment name',
        custom() {
          if (!/^[a-z0-9-_]+$/g.test(this.value)) return 'invalid'
        }
      },
      environmentVariables: {
        label: 'Environment variables',
        type: ['blackbox']
      }
    }

    if (this.props.app.platform.createParams) {
      schema.options = {
        type: this.props.app.platform.createParams
      }
    }

    return schema
  }

  renderPlatformOptions() {
    if (!this.props.app.platform.createParams) return
    return (
      <Section
        title={`${this.props.app.platform.name} Configuration`}
        description="Configure platform specific options">
        <Field fieldName="options" type={ObjectField}>
          <Fields
            getFieldComponent={AutoForm.getFieldComponent}
            params={this.props.app.platform.createParams}
          />
        </Field>
      </Section>
    )
  }

  renderEnvironmentVariables() {
    const {basicEnvironmentVariablesParams} = this.props.app.platform
    return (
      <Section title="Environment variables" description="Configure you app environment variables">
        <Field
          fieldName="environmentVariables"
          type={EnvironmentVariables}
          basicEnvironmentVariables={basicEnvironmentVariablesParams}
        />
      </Section>
    )
  }

  renderLoading() {
    return (
      <div className={styles.container}>
        <Header>Create a new environment</Header>
        <div className="divider" />
        <Content>
          <LoadingSection top />
          <LoadingSection />
        </Content>
      </div>
    )
  }

  renderCreateVersion() {
    const {appId} = this.props.match.params
    return (
      <div className={styles.container}>
        <Header>Create a new environment</Header>
        <div className="divider" />
        <Content>
          <NewVersionHelp appId={appId} />
        </Content>
      </div>
    )
  }

  render() {
    if (this.props.loading) return this.renderLoading()
    if (!this.props.app.versions.length) return this.renderCreateVersion()
    const {appId} = this.props.match.params
    return (
      <div className={styles.container}>
        <Header>Create a new environment</Header>
        <div className="divider" />
        <Content>
          <AutoForm
            mutation="createEnvironment"
            ref="form"
            schema={this.getSchema()}
            doc={{appId, options: this.props.app.platform.defaultOptions, environmentVariables: []}}
            omit="appId"
            onSuccess={({name}) => this.props.history.push(`/dashboard/apps/${appId}/${name}`)}>
            <Section
              top
              title="Environment configuration"
              description="An environment is a deployment for your application">
              <div className="label">Environment name</div>
              <Field
                fieldName="environmentName"
                type={Text}
                placeholder="Something like production or beta"
              />
              <div className="label">Version</div>
              <Field
                fieldName="versionLabel"
                type={Select}
                options={this.props.app.versions}
                placeholder="Select the version you want to deploy"
              />
              <div className="description">A version is required to create your environment</div>
            </Section>
            {this.renderPlatformOptions()}
            {this.renderEnvironmentVariables()}
          </AutoForm>
          <br />
          <div className="right">
            <Button to={`/dashboard/apps/${appId}`} style={{marginRight: 10}}>
              Cancel
            </Button>
            <Button onClick={() => this.refs.form.submit()} primary>
              Create Environment
            </Button>
          </div>
          <br />
          <br />
        </Content>
      </div>
    )
  }
}
