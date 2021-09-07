import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Version from './Version'
import Layout from '../../Layout'

@withGraphQL(
  gql`
    query getStaticWebsite($staticWebsiteId: ID) {
      staticWebsite(staticWebsiteId: $staticWebsiteId) {
        _id
        environments {
          value: _id
          label: name
        }
        versions {
          _id
          label
          createdAt
          number
          description
          deployedInEnvironments {
            _id
            name
          }
        }
      }
    }
  `,
  {loading: null}
)
export default class List extends React.Component {
  static propTypes = {
    staticWebsite: PropTypes.object,
    loading: PropTypes.bool
  }

  state = {}

  renderNoVersions() {
    return (
      <div>
        <h1>No versions uploaded</h1>
      </div>
    )
  }

  renderLoading() {
    return [
      <div key={1} className={styles.loadingVersion} />,
      <div key={2} className={styles.loadingVersion} />,
      <div key={3} className={styles.loadingVersion} />
    ]
  }

  renderVersions() {
    if (this.props.loading) return this.renderLoading()
    if (!this.props.staticWebsite.versions.length) return this.renderNoVersions()
    return this.props.staticWebsite.versions.map(version => {
      return (
        <div key={version.label}>
          <Version version={version} staticWebsite={this.props.staticWebsite} />
        </div>
      )
    })
  }

  render() {
    return <Layout>{this.renderVersions()}</Layout>
  }
}
