import React from 'react'
import Section from 'App/components/Section'
import PropTypes from 'prop-types'
import styles from './styles.css'

export default class Verify extends React.Component {
  static propTypes = {
    certificate: PropTypes.object
  }

  renderValidationEmail(options, last) {
    return (
      <div>
        <div>
          For <b>{options.domainName}</b>:
        </div>
        <br />
        {options.validationEmails.map(email => (
          <div key={email}>{email}</div>
        ))}
        {last ? null : <div className="divider" />}
      </div>
    )
  }

  renderValidationDNS(options, last) {
    return (
      <div>
        <div>
          For <b>{options.domainName}</b>:
        </div>
        <br />
        <table>
          <tbody>
            <tr>
              <td>Record name:</td>
              <td>
                <b>{options.resourceRecord.name}</b>
              </td>
            </tr>
            <tr>
              <td>Value:</td>
              <td>
                <b>{options.resourceRecord.value}</b>
              </td>
            </tr>
          </tbody>
        </table>
        {last ? null : <div className="divider" />}
      </div>
    )
  }

  renderValidationType(options, last) {
    if (options.validationMethod === 'EMAIL') {
      return this.renderValidationEmail(options, last)
    } else if (options.validationMethod === 'DNS') {
      return this.renderValidationDNS(options, last)
    }
  }

  renderOptions() {
    const pendingOptions = this.props.certificate.domainValidationOptions.filter(options => {
      return options.validationStatus === 'PENDING_VALIDATION'
    })
    return pendingOptions.map((options, index) => {
      const last = index === pendingOptions.length - 1
      return this.renderValidationType(options, last)
    })
  }

  renderValidationHeader() {
    const options = this.props.certificate.domainValidationOptions
    const method = options[0].validationMethod
    const multi = options.length > 1
    const s = multi ? 's' : ''
    if (method === 'EMAIL') {
      return (
        <div>
          We sent email to the addresses below. To validate control of the domain
          {s}, the owner of the domain
          {s} or an authorized representative must go to the Amazon certificate approval website and
          approve the request. Further instructions are provided in the body of the email.
        </div>
      )
    } else if (method === 'DNS') {
      return (
        <div>
          Add the following <b>CNAME</b> record
          {s} to the DNS configuration of your domain
          {s}
        </div>
      )
    }
  }

  renderVerify() {
    return (
      <Section
        title="Validate certificate"
        description="Please complete the validation to use this certificate"
        top>
        {this.renderValidationHeader()}
        <br />
        {this.renderOptions()}
      </Section>
    )
  }

  renderDomains() {
    return this.props.certificate.domains.map(domain => {
      return (
        <span className={styles.domain} key={domain}>
          {domain}
        </span>
      )
    })
  }

  renderStatus() {
    const statusLabels = {
      PENDING_VALIDATION: 'Pending validation',
      ISSUED: 'Issued',
      INACTIVE: 'Inactive',
      EXPIRED: 'Expired',
      VALIDATION_TIMED_OUT: 'Validation timed out',
      REVOKED: 'Revoked',
      FAILED: 'Failed'
    }
    const {certificate} = this.props
    const status = certificate.status
    const label = statusLabels[status] || status

    return (
      <Section title="Status" top description={`You certificate is ${label}`}>
        You certificate is {label}.<div className={styles.domains}>{this.renderDomains()}</div>
      </Section>
    )
  }

  render() {
    const {status} = this.props.certificate
    if (status === 'PENDING_VALIDATION') return this.renderVerify()
    return this.renderStatus()
  }
}
