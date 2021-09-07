import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Header from '../../Header'
import PropTypes from 'prop-types'
import Tabs from 'orionsoft-parts/lib/components/Tabs'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Events from './Events'
import Configuration from './Configuration'
import Dashboard from './Dashboard'
import Content from 'App/components/Content'
import Servers from './Servers'
import Monitoring from './Monitoring'
import Instances from './Instances'
import Logs from './Logs'

@withGraphQL(
  gql`
    query getEnvironment($appId: ID, $environmentName: String) {
      environment(appId: $appId, environmentName: $environmentName) {
        name
        cleanName
        status
        health
        appId
      }
    }
  `,
  {loading: null, options: {pollInterval: 10000}}
)
export default class Environment extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    environment: PropTypes.object,
    loading: PropTypes.bool
  }

  renderLaunching() {
    return (
      <div className={styles.container}>
        <Header>{this.props.environment.cleanName}</Header>
        <br />
        <br />
        <br />
        <Content>
          <div className={styles.launchingTitle}>Your environment is being created...</div>
          <Events match={this.props.match} />
        </Content>
      </div>
    )
  }

  renderTabs() {
    const {appId, environmentName} = this.props.match.params
    const getPath = ending => `/dashboard/apps/${appId}/${environmentName}${ending}`
    return (
      <Tabs
        items={[
          // {title: 'Dashboard', path: getPath('')},
          {title: 'Monitoring', path: getPath('/monitoring')},
          {title: 'Instances', path: getPath('/instances')},
          {title: 'Logs', path: getPath('/logs')},
          {title: 'Activity', path: getPath('/events')},
          {title: 'Servers', path: getPath('/servers')},
          {title: 'Configuration', path: getPath('/configuration')}
        ]}
      />
    )
  }

  render() {
    const {appId, environmentName} = this.props.match.params
    const {environment} = this.props
    if (environment && environment.status === 'Launching') return this.renderLaunching()
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Header status={environment && environment.status}>
            {environment ? environment.cleanName : environmentName.replace(appId + '-', '')}
          </Header>
          <br />
          {this.renderTabs()}
        </div>
        <Content>
          <Switch>
            <Route path="/dashboard/apps/:appId/:environmentName" exact component={Dashboard} />
            <Route path="/dashboard/apps/:appId/:environmentName/servers" component={Servers} />
            <Route
              path="/dashboard/apps/:appId/:environmentName/monitoring"
              component={Monitoring}
            />
            <Route path="/dashboard/apps/:appId/:environmentName/instances" component={Instances} />
            <Route path="/dashboard/apps/:appId/:environmentName/events" component={Events} />
            <Route
              path="/dashboard/apps/:appId/:environmentName/configuration"
              component={Configuration}
            />
            <Route path="/dashboard/apps/:appId/:environmentName/logs" component={Logs} />
          </Switch>
        </Content>
      </div>
    )
  }
}
