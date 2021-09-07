import React from 'react'
import styles from './styles.css'
import {Field} from 'simple-react-form'
import Section from 'App/components/Section'
import PropTypes from 'prop-types'
import AutoForm from 'App/components/AutoForm'
import LoadingSection from 'App/components/LoadingSection'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import DomainsField from 'App/Pages/Dashboard/Certificates/Create/Domains'

const fragment = gql`
  fragment staticWebsiteEnvironmentDomains on StaticWebsiteEnvironment {
    _id
    name
    staticWebsiteId
    domains
    cname
  }
`

@withGraphQL(
  gql`
    query getStaticWebsite($staticWebsiteId: ID, $environmentName: ID) {
      environment: staticWebsiteEnvironment(
        environmentName: $environmentName
        staticWebsiteId: $staticWebsiteId
      ) {
        ...staticWebsiteEnvironmentDomains
      }
    }
    ${fragment}
  `,
  {loading: <LoadingSection top />}
)
export default class Domains extends React.Component {
  static propTypes = {
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
    const {environment} = this.props
    return (
      <div className={styles.container}>
        <AutoForm
          mutation="setStaticWebsiteEnvironmentDomains"
          ref="form"
          fragment={fragment}
          doc={{
            environmentName: environment.name,
            staticWebsiteId: environment.staticWebsiteId,
            domains: environment.domains
          }}>
          <Section
            title="Domains"
            description={`You must list any custom domain names (for example, www.example.com) that you use in addition to the CloudFront domain name (${
              environment.cname
            })`}
            top>
            <div className="label">Domain names</div>
            <Field fieldName="domains" type={DomainsField} />
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
