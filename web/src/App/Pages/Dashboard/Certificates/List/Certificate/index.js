import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import SecureIcon from 'react-icons/lib/md/https'
import PendingIcon from 'react-icons/lib/md/lock-open'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

const statusLabels = {
  PENDING_VALIDATION: 'Pending validation',
  ISSUED: 'Issued',
  INACTIVE: 'Inactive',
  EXPIRED: 'Expired',
  VALIDATION_TIMED_OUT: 'Validation timed out',
  REVOKED: 'Revoked',
  FAILED: 'Failed'
}

const statusIcons = {
  PENDING_VALIDATION: <PendingIcon />,
  ISSUED: <SecureIcon />,
  INACTIVE: <PendingIcon />,
  EXPIRED: <PendingIcon />,
  VALIDATION_TIMED_OUT: <PendingIcon />,
  REVOKED: <PendingIcon />,
  FAILED: <PendingIcon />
}

@withRouter
export default class Certificate extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    certificate: PropTypes.object
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

  renderStatus(status) {
    const label = statusLabels[status] || status
    return <div className={styles.status}>{label}</div>
  }

  render() {
    const {credentialId, region} = this.props.match.params
    const {certificate} = this.props
    const status = certificate.status
    const icon = statusIcons[status] || <PendingIcon />
    const certificateId = encodeURIComponent(certificate._id)
    const path = `/dashboard/certificates/${credentialId}/${region}/${certificateId}`
    return (
      <Link className={styles.container} to={path}>
        <div className={styles.head}>
          {icon}
          <div>{this.renderStatus(status)}</div>
        </div>
        <div className={styles.domains}>{this.renderDomains()}</div>
      </Link>
    )
  }
}
