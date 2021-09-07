import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Environments from './Environments'
import Versions from './Versions'
import Configuration from './Configuration'
import CreateEnvironment from './CreateEnvironment'
import Environment from './Environment'

export default class StaticWebsite extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/dashboard/static-websites/:staticWebsiteId/versions" component={Versions} />
          <Route
            path="/dashboard/static-websites/:staticWebsiteId/create"
            component={CreateEnvironment}
          />
          <Route
            path="/dashboard/static-websites/:staticWebsiteId/configuration"
            component={Configuration}
          />
          <Route
            path="/dashboard/static-websites/:staticWebsiteId/:environmentName"
            component={Environment}
          />
          <Route path="/dashboard/static-websites/:staticWebsiteId" component={Environments} />
        </Switch>
      </div>
    )
  }
}
