import React from 'react'
import styles from './styles.css'
import {Field} from 'simple-react-form'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import {Link} from 'react-router-dom'
import Section from 'App/components/Section'
import PropTypes from 'prop-types'
import AutoForm from 'App/components/AutoForm'
import LoadingSection from 'App/components/LoadingSection'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'

const fragment = gql`
  fragment staticWebsiteEnvironmentCertificate on StaticWebsiteEnvironment {
    _id
    name
    certificateId
  }
`

@withGraphQL(
  gql`
    query getStaticWebsite($staticWebsiteId: ID, $environmentName: ID) {
      staticWebsite(staticWebsiteId: $staticWebsiteId) {
        _id
        credentialId
        region
      }
      environment: staticWebsiteEnvironment(
        environmentName: $environmentName
        staticWebsiteId: $staticWebsiteId
      ) {
        ...staticWebsiteEnvironmentCertificate
      }
      certificates(staticWebsiteId: $staticWebsiteId, statuses: "ISSUED") {
        _id
        domains
      }
    }
    ${fragment}
  `,
  {loading: <LoadingSection />}
)
export default class Certificate extends React.Component {
  static propTypes = {
    staticWebsite: PropTypes.object,
    certificates: PropTypes.array,
    environment: PropTypes.object
  }

  getCertificates() {
    return this.props.certificates.map(cert => {
      return {
        label: cert.domains.join(', '),
        value: cert._id
      }
    })
  }

  render() {
    const {staticWebsite, environment} = this.props
    return (
      <div className={styles.container}>
        <AutoForm
          mutation="setStaticWebsiteEnvironmentCertificate"
          ref="form"
          fragment={fragment}
          doc={{
            environmentName: environment.name,
            staticWebsiteId: staticWebsite._id,
            certificateId: environment.certificateId
          }}>
          <Section
            title="SSL certificate (HTTPS)"
            description="If you add a SSL certificate to this environment, all request will be redirected to HTTPS">
            <div className="label">Certificate to use</div>
            <Field
              fieldName="certificateId"
              placeholder="Select a certificate"
              type={Select}
              options={this.getCertificates()}
            />
            <div className="description">
              Attach a SLL certificate to add https connection to your website.{' '}
              <Link
                to={`/dashboard/certificates/${staticWebsite.credentialId}/${
                  staticWebsite.region
                }`}>
                My certificates
              </Link>
            </div>
            <br />
            <Button primary onClick={() => this.refs.form.submit()}>
              Save
            </Button>
          </Section>
        </AutoForm>
      </div>
    )
  }
}
