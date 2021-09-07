import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Layout from '../Layout'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
// import Status from './Status'
import Configuration from './Configuration'
import Behavior from './Behavior'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Loading from 'orionsoft-parts/lib/components/Loading'

@withGraphQL(
  gql`
    query getStaticWebsiteEnvironmentStatus($environmentName: ID, $staticWebsiteId: ID) {
      environment: staticWebsiteEnvironment(
        environmentName: $environmentName
        staticWebsiteId: $staticWebsiteId
      ) {
        _id
        name
        status
      }
    }
  `,
  {loading: null, options: {pollInterval: 5000}}
)
@withRouter
export default class Environment extends React.Component {
  static propTypes = {
    environment: PropTypes.object,
    match: PropTypes.object
  }

  renderRight() {
    const {environment} = this.props
    if (!environment) return

    const statuses = {
      InProgress: 'updating',
      Deployed: null
    }

    const status = statuses[environment.status]
    if (!status) return
    return (
      <div className={styles.updating}>
        <Loading size={18} color="#666" />
        <div className={styles.updatingText}>An update is in progress</div>
      </div>
    )
  }

  render() {
    const {staticWebsiteId, environmentName} = this.props.match.params
    const getPath = ending =>
      `/dashboard/static-websites/${staticWebsiteId}/${environmentName}${ending}`
    const tabs = [
      // {title: 'Status', path: getPath('')},
      {title: 'Behavior', path: getPath('')},
      {title: 'Configuration', path: getPath('/configuration')}
    ]

    return (
      <Layout title={environmentName} tabs={tabs} right={this.renderRight()}>
        <Switch>
          {/* <Route
            path="/dashboard/static-websites/:staticWebsiteId/:environmentName"
            component={Status}
            exact
          /> */}
          <Route
            path="/dashboard/static-websites/:staticWebsiteId/:environmentName"
            component={Behavior}
            exact
          />
          <Route
            path="/dashboard/static-websites/:staticWebsiteId/:environmentName/configuration"
            component={Configuration}
          />
        </Switch>
      </Layout>
    )
  }
}
