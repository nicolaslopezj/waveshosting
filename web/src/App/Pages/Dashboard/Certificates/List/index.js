import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Certificate from './Certificate'
import Button from 'orionsoft-parts/lib/components/Button'
import range from 'lodash/range'
import Content from 'App/components/Content'
import Breadcrumbs from 'App/components/Breadcrumbs'

@withGraphQL(
  gql`
    query getMyCertificates($credentialId: ID, $region: ID) {
      certificates(credentialId: $credentialId, region: $region) {
        _id
        domains
        status
        inUse
      }
    }
  `,
  {loading: null}
)
export default class List extends React.Component {
  static propTypes = {
    certificates: PropTypes.array,
    match: PropTypes.object,
    loading: PropTypes.bool
  }

  renderCertificates() {
    if (this.props.loading) return this.renderLoading()
    return this.props.certificates.map(certificate => {
      return (
        <div key={certificate._id} className={`col-xs-12 col-sm-4 ${styles.certCol}`}>
          <Certificate certificate={certificate} />
        </div>
      )
    })
  }

  renderLoading() {
    return range(3).map(index => {
      return (
        <div key={index} className="col-xs-12 col-sm-4">
          <div className={styles.loading} />
        </div>
      )
    })
  }

  render() {
    const {credentialId, region} = this.props.match.params
    return (
      <div>
        <Breadcrumbs past={{'/dashboard/certificates': 'Certificates'}}>List</Breadcrumbs>
        <div className="divider" />
        <Content>
          <div className="row">{this.renderCertificates()}</div>
          <br />
          <Button to={`/dashboard/certificates/${credentialId}/${region}/create`}>
            Create new certificate
          </Button>
        </Content>
      </div>
    )
  }
}
