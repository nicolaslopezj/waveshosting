import React from 'react'
import styles from './styles.css'
import Header from '../../Header'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Content from 'App/components/Content'
import Version from './Version'

@withGraphQL(
  gql`
    query getApp($appId: ID) {
      app(appId: $appId) {
        _id
        environments {
          value: name
          label: cleanName
        }
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
    }
  `,
  {loading: null}
)
export default class List extends React.Component {
  static propTypes = {
    app: PropTypes.object,
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
    if (!this.props.app.versions.length) return this.renderNoVersions()
    return this.props.app.versions.map(version => {
      return (
        <div key={version.label}>
          <Version version={version} app={this.props.app} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Header />
        <Content>{this.renderVersions()}</Content>
      </div>
    )
  }
}
