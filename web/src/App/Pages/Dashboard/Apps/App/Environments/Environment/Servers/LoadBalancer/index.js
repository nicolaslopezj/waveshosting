import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import LoadingSection from 'App/components/LoadingSection'
import AutoForm from 'App/components/AutoForm'
import PropTypes from 'prop-types'
import {Field, WithValue} from 'simple-react-form'
import Toggle from 'orionsoft-parts/lib/components/fields/Toggle'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Button from 'orionsoft-parts/lib/components/Button'
import ObjectField from 'App/components/fields/ObjectField'
import {Link} from 'react-router-dom'
import Checkbox from 'orionsoft-parts/lib/components/fields/Checkbox'
import Scaling from './Scaling'
import NumberField from 'orionsoft-parts/lib/components/fields/numeral/Number'

const fragment = gql`
  fragment editLoadBalancer on Environment {
    name
    status
    appId
    scalingOptions {
      minInstances
      maxInstances
      certificateId
      stickinessEnabled
      scalingCooldown
      scalingMetric
      lowerThreshold
      upperThreshold
      healthyHttpCode
      healthCheckPath
      autoscalingEnabled
    }
  }
`

@withGraphQL(
  gql`
    query getEnvLoadBalancerSettings($appId: ID, $environmentName: String) {
      app(appId: $appId) {
        _id
        region
        credentialId
      }
      environment(appId: $appId, environmentName: $environmentName) {
        ...editLoadBalancer
      }
      certificates(appId: $appId, statuses: "ISSUED") {
        _id
        domains
      }
    }
    ${fragment}
  `,
  {loading: <LoadingSection />}
)
export default class LoadBalancer extends React.Component {
  static propTypes = {
    environment: PropTypes.object,
    certificates: PropTypes.array,
    app: PropTypes.object
  }

  getCertificates() {
    return this.props.certificates.map(cert => {
      return {
        label: cert.domains.join(', '),
        value: cert._id
      }
    })
  }

  renderScalingOptions({useLoadBalancer, options}) {
    if (!useLoadBalancer) return
    const {app} = this.props
    return (
      <div>
        <Field fieldName="options" type={ObjectField}>
          <br />
          <div>
            <div className="label">SSL certificate (HTTPS)</div>
            <Field
              fieldName="certificateId"
              placeholder="Select a certificate"
              type={Select}
              options={this.getCertificates()}
            />
            <div className="description">
              Attach a SLL certificate to add https connection to the load balancer.{' '}
              <Link to={`/dashboard/certificates/${app.credentialId}/${app.region}`}>
                My certificates
              </Link>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="label">Health check path</div>
              <Field fieldName="healthCheckPath" type={Text} />
              <div className="description">
                The ping path that is the destination on the targets for health checks
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="label">Healthy http code</div>
              <Field fieldName="healthyHttpCode" type={Text} />
              <div className="description">
                The HTTP codes to use when checking for a successful response from a target. You can
                specify multiple values (for example, {'"'}
                200,202
                {'"'}) or a range of values (for example,
                {'"'}
                200-299
                {'"'})
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="label">Load balancer stickiness</div>
              <Field fieldName="stickinessEnabled" type={Checkbox} label="Stickiness enabled" />
              <div style={{height: 16}} />
              <div className="description">
                Control whether the load balancer routes requests for the same session to the
                instance with the smallest load, or consistently to the same instance
              </div>
            </div>
          </div>
        </Field>
        <div className="divider" />
        <Field fieldName="options" type={ObjectField}>
          <Field fieldName="autoscalingEnabled" type={Toggle} label="Enable autoscaling" />
          <br />
          {options.autoscalingEnabled ? (
            <Scaling />
          ) : (
            <div>
              <div className="label">Number of instances</div>
              <Field fieldName="minInstances" type={NumberField} />
              <div className="description">Number of instances in your environment</div>
            </div>
          )}
        </Field>
      </div>
    )
  }

  render() {
    const {environment} = this.props
    const defaultOptions = {minInstances: 1, maxInstances: 1}
    return (
      <div className={styles.container}>
        <Section
          title="Load balancer"
          description="To scale your app or add SSL (https) you need to activate the load balancer">
          <div>
            <AutoForm
              mutation="setScalingOptions"
              ref="form"
              fragment={fragment}
              doc={{
                environmentName: environment.name,
                appId: environment.appId,
                useLoadBalancer: !!environment.scalingOptions,
                options: environment.scalingOptions || defaultOptions
              }}>
              <Field fieldName="useLoadBalancer" type={Toggle} label="Use load balancer" />
              <WithValue>{value => this.renderScalingOptions(value)}</WithValue>
            </AutoForm>
            <br />
            <Button
              disabled={environment.status !== 'Ready'}
              tooltip={environment.status !== 'Ready' ? 'The environment must be ready' : null}
              primary
              onClick={() => this.refs.form.submit()}>
              Save
            </Button>
          </div>
        </Section>
      </div>
    )
  }
}
