import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

@withGraphQL(
  gql`
    query getAppEnvironments($staticWebsiteId: ID) {
      staticWebsite(staticWebsiteId: $staticWebsiteId) {
        _id
        environments {
          name
          staticWebsiteId
        }
      }
    }
  `,
  {loading: null}
)
export default class List extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    staticWebsite: PropTypes.object,
    networkStatus: PropTypes.number
  }

  renderLoading() {
    return [
      <div key={1} className="col-xs-12 col-sm-4">
        <div className={styles.loadingEnvironment} />
      </div>,
      <div key={2} className="col-xs-12 col-sm-4">
        <div className={styles.loadingEnvironment} />
      </div>,
      <div key={3} className="col-xs-12 col-sm-4">
        <div className={styles.loadingEnvironment} />
      </div>
    ]
  }

  renderEnvironments() {
    if (this.props.networkStatus !== 7) return this.renderLoading()
    return this.props.staticWebsite.environments.map(environment => {
      return (
        <div key={environment.name} className="col-xs-12 col-sm-4">
          <Link
            to={`/dashboard/static-websites/${environment.staticWebsiteId}/${environment.name}`}
            className={styles.environment}>
            <div className={styles.name}>{environment.name}</div>
          </Link>
        </div>
      )
    })
  }

  render() {
    return <div className="row">{this.renderEnvironments()}</div>
  }
}
