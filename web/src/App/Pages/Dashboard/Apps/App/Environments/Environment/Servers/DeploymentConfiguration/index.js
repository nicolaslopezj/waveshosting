import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import LoadingSection from 'App/components/LoadingSection'
import AutoForm from 'App/components/AutoForm'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import NumberField from 'orionsoft-parts/lib/components/fields/numeral/Number'
import Button from 'orionsoft-parts/lib/components/Button'
import PropTypes from 'prop-types'
import {Field, WithValue} from 'simple-react-form'
import ObjectField from 'App/components/fields/ObjectField'
import autobind from 'autobind-decorator'

const fragment = gql`
  fragment editDeploymentOptions on Environment {
    name
    appId
    status
    deploymentOptions {
      deploymentPolicy
      batchSize
    }
  }
`

@withGraphQL(
  gql`
    query getEnvironmentDeploymentOptions($appId: ID, $environmentName: String) {
      environment(appId: $appId, environmentName: $environmentName) {
        ...editDeploymentOptions
      }
    }
    ${fragment}
  `,
  {loading: <LoadingSection />}
)
export default class UpdatesConfiguration extends React.Component {
  static propTypes = {
    environment: PropTypes.object
  }

  @autobind
  renderForm({deploymentPolicy, batchSize}) {
    const policies = {
      allAtOnce: {
        name: 'All at once',
        showBatchSize: false,
        description:
          'Deploy the new version to all instances simultaneously. All instances in your environment are out of service for a short time while the deployment occurs'
      },
      rolling: {
        name: 'Rolling',
        showBatchSize: true,
        description:
          "Deploy the new version in batches. Each batch is taken out of service during the deployment phase, reducing your environment's capacity by the number of instances in a batch."
      },
      rollingWithAdditionalBatch: {
        name: 'Rolling With Additional Batch',
        showBatchSize: true,
        description:
          'Deploy the new version in batches, but first launch a new batch of instances to ensure full capacity during the deployment process.'
      },
      immutable: {
        name: 'Immutable',
        showBatchSize: false,
        description:
          'Deploy the new version to a fresh group of instances by performing an immutable update.'
      }
    }
    const options = Object.keys(policies).map(key => ({label: policies[key].name, value: key}))
    const {showBatchSize} = policies[deploymentPolicy] || {}
    const {description} = policies[deploymentPolicy] || {}
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <div className="label">Deployment policy</div>
          <Field fieldName="deploymentPolicy" type={Select} options={options} />
          <div className="description">{description}</div>
        </div>
        {showBatchSize ? (
          <div className="col-xs-12 col-sm-4">
            <div className="label">Batch size</div>
            <Field fieldName="batchSize" type={NumberField} />
            <div className="description">
              The size of the set of instances to deploy in each batch.
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  render() {
    const {environment} = this.props
    return (
      <div className={styles.container}>
        <Section
          title="Deployment configuration"
          description="Configure how servers will behave during a deployment">
          <AutoForm
            mutation="setEnvironmentDeploymentOptions"
            ref="form"
            fragment={fragment}
            doc={{
              environmentName: environment.name,
              appId: environment.appId,
              options: environment.deploymentOptions
            }}>
            <Field fieldName="options" type={ObjectField}>
              <WithValue>{this.renderForm}</WithValue>
            </Field>
          </AutoForm>
          <br />
          <Button
            disabled={environment.status !== 'Ready'}
            tooltip={environment.status !== 'Ready' ? 'The environment must be ready' : null}
            primary
            onClick={() => this.refs.form.submit()}>
            Save
          </Button>
        </Section>
      </div>
    )
  }
}
