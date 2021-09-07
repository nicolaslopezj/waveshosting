import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import moment from 'moment'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {Link} from 'react-router-dom'
import Description from './Description'
import MutationButton from 'App/components/MutationButton'
import gql from 'graphql-tag'

export default class Version extends React.Component {
  static propTypes = {
    version: PropTypes.object,
    app: PropTypes.object
  }

  renderDeployed() {
    const deployedIn = this.props.version.deployedInEnvironments
    if (!deployedIn.length) return <span className={styles.noDeployment}>Not deployed</span>
    return deployedIn.map(environment => {
      return (
        <Tooltip key={environment.name} content="Deployed in this environment">
          <span className={styles.deployedIn}>{environment.cleanName}</span>
        </Tooltip>
      )
    })
  }

  renderActions() {
    const {app, version} = this.props
    return (
      <div>
        <MutationButton
          mutation="deleteVersion"
          params={{appId: app._id, version: version.label}}
          component="span"
          className={styles.deleteVersion}
          label="Delete"
          message={
            <span>
              If you delete this version you won&#39;t be able to deploy it to any environment.{' '}
              <br />
              Are you sure you want to delete version <b>{version.label}</b>?
            </span>
          }
          title="Delete version"
          confirmText="Delete"
          fragment={gql`
            fragment version on App {
              _id
              versions {
                label
                status
                createdAt
                description
                deployedInEnvironments {
                  name
                  cleanName
                }
              }
            }
          `}
        />
        <Link to={`/dashboard/apps/${this.props.app._id}/versions/${version.label}/deploy`}>
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
            <Description version={version} app={this.props.app} />
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
