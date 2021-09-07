import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import List from './List'
import Deploy from './Deploy'

export default class Versions extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route
            path="/dashboard/static-websites/:staticWebsiteId/versions"
            exact
            component={List}
          />
          <Route
            path="/dashboard/static-websites/:staticWebsiteId/versions/:versionNumber/deploy"
            exact
            component={Deploy}
          />
        </Switch>
      </div>
    )
  }
}
