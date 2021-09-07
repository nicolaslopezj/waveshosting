import React from 'react'
import styles from './styles.css'
import Header from '../../Header'
import Button from 'orionsoft-parts/lib/components/Button'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import Content from 'App/components/Content'

@withGraphQL(
  gql`
    query getAppEnvironments($appId: ID) {
      app(appId: $appId) {
        _id
        environments {
          appId
          name
          cleanName
          status
          health
        }
      }
    }
  `,
  {loading: null}
)
export default class List extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    app: PropTypes.object,
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
    return this.props.app.environments.map(environment => {
      return (
        <div key={environment.name} className="col-xs-12 col-sm-4">
          <Link
            to={`/dashboard/apps/${environment.appId}/${environment.name}`}
            className={styles.environment}>
            <div className={styles.name}>{environment.cleanName}</div>
            <div className={styles.health} style={{background: environment.health}} />
          </Link>
        </div>
      )
    })
  }

  render() {
    const {appId} = this.props.match.params
    return (
      <div className={styles.container}>
        <Header />
        <Content>
          <div className="row">{this.renderEnvironments()}</div>
          <Button to={`/dashboard/apps/${appId}/create`}>Create a new environment</Button>
        </Content>
      </div>
    )
  }
}
