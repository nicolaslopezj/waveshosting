import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Content from 'App/components/Content'
import Verify from './Verify'
// import Details from './Details'
import Delete from './Delete'

@withGraphQL(
  gql`
    query getCertificate($certificateId: ID, $credentialId: ID, $region: ID) {
      certificate(certificateId: $certificateId, credentialId: $credentialId, region: $region) {
        _id
        domains
        createdAt
        status
        inUse
        domainValidationOptions {
          domainName
          validationStatus
          validationMethod
          validationEmails
          resourceRecord {
            name
            type
            value
          }
        }
      }
    }
  `,
  {loading: null, options: {pollInterval: 5000}}
)
export default class Certificate extends React.Component {
  static propTypes = {
    certificate: PropTypes.object,
    match: PropTypes.object,
    loading: PropTypes.bool
  }

  renderDetails() {
    const {loading, certificate} = this.props
    if (loading && !certificate) return
    return (
      <div>
        <Verify certificate={certificate} />
        {/* <Details certificate={certificate} /> */}
        <Delete certificate={certificate} />
      </div>
    )
  }

  render() {
    const {credentialId, region} = this.props.match.params
    const listPath = `/dashboard/certificates/${credentialId}/${region}`
    return (
      <div>
        <Breadcrumbs past={{'/dashboard/certificates': 'Certificates', [listPath]: 'List'}}>
          Certificate
        </Breadcrumbs>
        <div className="divider" />
        <Content>{this.renderDetails()}</Content>
      </div>
    )
  }
}
