import React from 'react'
import styles from './styles.css'
import Button from 'orionsoft-parts/lib/components/Button'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import App from './App'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Content from 'App/components/Content'
import uniqBy from 'lodash/uniqBy'
import TransferRequest from './TransferRequest'
import Add from 'App/Pages/Dashboard/Settings/Credentials/Add'
import withUserId from 'App/helpers/auth/withUserId'

@withUserId
@withGraphQL(
  gql`
    query getMyApps($userId: ID) {
      apps(userId: $userId) {
        totalCount
        items {
          _id
          region
          credential {
            _id
            name
          }
          platform {
            _id
            name
            color
          }
          isOwner
        }
      }
      transferRequests
      credentials {
        _id
      }
    }
  `,
  {loading: null}
)
export default class List extends React.Component {
  static propTypes = {
    apps: PropTypes.object,
    credentials: PropTypes.array,
    networkStatus: PropTypes.number,
    transferRequests: PropTypes.array,
    refetch: PropTypes.func
  }

  getCredentials() {
    const credentials = []
    for (const app of this.props.apps.items) {
      credentials.push(app.credential)
    }
    return uniqBy(credentials, '_id').sort((a, b) => a.name.localeCompare(b.name))
  }

  renderLoading() {
    const apps = [
      <div key={1} className="col-xs-12 col-sm-4">
        <div className={styles.loadingApp} />
      </div>,
      <div key={2} className="col-xs-12 col-sm-4">
        <div className={styles.loadingApp} />
      </div>,
      <div key={3} className="col-xs-12 col-sm-4">
        <div className={styles.loadingApp} />
      </div>
    ]
    return (
      <div>
        <div className={styles.credentialLoading} />
        <div className="row">{apps}</div>
      </div>
    )
  }

  renderCreateCredential() {
    if (!this.props.apps) return
    if (this.props.apps.items.length) return
    if (!this.props.credentials) return
    if (this.props.credentials.length) return
    return (
      <div>
        <div className={styles.welcomeTitle}>Welcome to Waves!</div>
        <div className={styles.welcomeText}>
          The first thing we need to do is connect your AWS account
        </div>
        <Add onHome refetch={this.props.refetch} />
      </div>
    )
  }

  renderNoApps() {
    if (!this.props.apps) return
    if (!this.props.credentials.length) return
    if (this.props.apps.items.length) return
    return (
      <div>
        <div className={styles.noAppsText}>
          You don
          {"'"}t have any app yet
        </div>
        <Button to="/dashboard/apps/create">Create App</Button>
      </div>
    )
  }

  renderApps(credential) {
    const apps = this.props.apps.items
      .filter(app => app.credential._id === credential._id)
      .map(app => {
        return (
          <div key={app._id} className="col-xs-12 col-sm-4">
            <App app={app} />
          </div>
        )
      })
    return <div className="row">{apps}</div>
  }

  renderCredentials() {
    if (this.props.networkStatus !== 7) return this.renderLoading()
    if (!this.props.apps) return
    return this.getCredentials().map(credential => {
      return (
        <div key={credential._id}>
          <div className={styles.credential}>{credential.name}</div>
          {this.renderApps(credential)}
        </div>
      )
    })
  }

  renderTransferRequests() {
    const {transferRequests} = this.props
    if (!transferRequests || !transferRequests.length) return
    return transferRequests.map(appId => {
      return <TransferRequest key={appId} appId={appId} />
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs right={<Button to="/dashboard/apps/create">Create App</Button>}>
          My Apps
        </Breadcrumbs>
        <div className="divider" />
        <Content>
          <div className={styles.content}>
            {this.renderCreateCredential()}
            {this.renderTransferRequests()}
            {this.renderNoApps()}
            {this.renderCredentials()}
          </div>
        </Content>
      </div>
    )
  }
}
