import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import moment from 'moment'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {Link} from 'react-router-dom'
import Description from './Description'

export default class Version extends React.Component {
  static propTypes = {
    version: PropTypes.object,
    staticWebsite: PropTypes.object
  }

  renderDeployed() {
    const deployedIn = this.props.version.deployedInEnvironments
    if (!deployedIn.length) return <span className={styles.noDeployment}>Not deployed</span>
    return deployedIn.map(environment => {
      return (
        <Tooltip key={environment.name} content="Deployed in this environment">
          <span className={styles.deployedIn}>{environment.name}</span>
        </Tooltip>
      )
    })
  }

  renderActions() {
    return (
      <div>
        <Link to="/" className={styles.deleteVersion}>
          Delete
        </Link>
        <Link
          to={`/dashboard/static-websites/${this.props.staticWebsite._id}/versions/${
            this.props.version.number
          }/deploy`}>
          Deploy
        </Link>
      </div>
    )
  }

  renderDate() {
    const {createdAt} = this.props.version
    if (moment(createdAt).isBefore(moment().subtract(1, 'day'))) {
      return <span>Created at {moment(createdAt).format('LLL')}</span>
    } else {
      return <span>Created {moment(createdAt).fromNow()}</span>
    }
  }

  render() {
    const {version} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.labelAndDescription}>
            <div className={styles.label}>{version.label}</div>
            <Description version={version} staticWebsite={this.props.staticWebsite} />
          </div>
          <div className={styles.date}>{this.renderDate()}</div>
        </div>
        <div className={styles.right}>
          <div>{this.renderDeployed()}</div>
          <div className={styles.actions}>{this.renderActions()}</div>
        </div>
      </div>
    )
  }
}
