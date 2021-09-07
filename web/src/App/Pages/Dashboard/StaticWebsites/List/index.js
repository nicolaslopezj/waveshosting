import React from 'react'
import styles from './styles.css'
import Button from 'orionsoft-parts/lib/components/Button'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import uniqBy from 'lodash/uniqBy'
import Add from 'App/Pages/Dashboard/Settings/Credentials/Add'
import StaticWebsite from './StaticWebsite'
import Layout from '../Layout'

@withGraphQL(
  gql`
    query {
      staticWebsites {
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
        }
      }
      credentials {
        _id
      }
    }
  `,
  {loading: null}
)
export default class List extends React.Component {
  static propTypes = {
    staticWebsites: PropTypes.object,
    credentials: PropTypes.array,
    networkStatus: PropTypes.number,
    transferRequests: PropTypes.array,
    refetch: PropTypes.func
  }

  getCredentials() {
    const credentials = []
    for (const staticWebsite of this.props.staticWebsites.items) {
      credentials.push(staticWebsite.credential)
    }
    return uniqBy(credentials, '_id').sort((a, b) => a.name.localeCompare(b.name))
  }

  renderLoading() {
    const staticWebsites = [
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
        <div className="row">{staticWebsites}</div>
      </div>
    )
  }

  renderCreateCredential() {
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
    if (!this.props.staticWebsites) return
    if (!this.props.credentials.length) return
    if (this.props.staticWebsites.items.length) return
    return (
      <div>
        <div className={styles.noAppsText}>
          You don
          {"'"}t have any static website yet
        </div>
        <Button to="/dashboard/static-websites/create">Create</Button>
      </div>
    )
  }

  renderApps(credential) {
    const staticWebsites = this.props.staticWebsites.items
      .filter(staticWebsite => staticWebsite.credential._id === credential._id)
      .map(staticWebsite => {
        return (
          <div key={staticWebsite._id} className="col-xs-12 col-sm-4">
            <StaticWebsite staticWebsite={staticWebsite} />
          </div>
        )
      })
    return <div className="row">{staticWebsites}</div>
  }

  renderCredentials() {
    if (this.props.networkStatus !== 7) return this.renderLoading()
    if (!this.props.staticWebsites) return
    return this.getCredentials().map(credential => {
      return (
        <div key={credential._id}>
          <div className={styles.credential}>{credential.name}</div>
          {this.renderApps(credential)}
        </div>
      )
    })
  }

  render() {
    return (
      <Layout
        title="Static Websites"
        right={<Button to="/dashboard/static-websites/create">Create</Button>}>
        <div className={styles.content}>
          {this.renderCreateCredential()}
          {this.renderNoApps()}
          {this.renderCredentials()}
        </div>
      </Layout>
    )
  }
}
