import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'
import Button from 'orionsoft-parts/lib/components/Button'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

@withRouter
export default class Delete extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    certificate: PropTypes.object
  }

  renderButton() {
    const {certificate} = this.props
    const {credentialId, region} = this.props.match.params
    const listPath = `/dashboard/certificates/${credentialId}/${region}`

    if (certificate.inUse) {
      return (
        <Button disabled tooltip="You can't delete a certificate that is in use">
          Delete certificate
        </Button>
      )
    }
    return (
      <MutationButton
        mutation="deleteCertificate"
        label="Delete certificate"
        message={<span>Are you sure you want to delete this certificate?</span>}
        title="Delete certificate"
        confirmText="Delete"
        params={this.props.match.params}
        danger
        onSuccess={() => this.props.history.replace(listPath)}
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Section
          title="Delete certificate"
          description="Delete this certificate. You can't undo this action">
          <div>Delete this certificate</div>
          <br />
          {this.renderButton()}
        </Section>
      </div>
    )
  }
}
