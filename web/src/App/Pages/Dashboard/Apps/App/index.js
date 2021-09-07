import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Environments from './Environments'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import Versions from './Versions'
import CreateEnvironment from './CreateEnvironment'
import Configuration from './Configuration'
import Access from './Access'

@withGraphQL(
  gql`
    query getApp($appId: ID) {
      app(appId: $appId) {
        _id
      }
    }
  `,
  {loading: null}
)
export default class App extends React.Component {
  static propTypes = {
    app: PropTypes.object,
    loading: PropTypes.bool
  }

  renderNotFound() {
    return (
      <div className={styles.notFound}>
        <h1>App not found</h1>
        <Button to="/dashboard">Go Back</Button>
      </div>
    )
  }

  render() {
    const {app} = this.props
    if (!this.props.loading && !app) return this.renderNotFound()
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/dashboard/apps/:appId/versions" component={Versions} />
          <Route path="/dashboard/apps/:appId/create" component={CreateEnvironment} />
          <Route path="/dashboard/apps/:appId/access" component={Access} />
          <Route path="/dashboard/apps/:appId/configuration" component={Configuration} />
          <Route path="/dashboard/apps/:appId" component={Environments} />
        </Switch>
      </div>
    )
  }
}
