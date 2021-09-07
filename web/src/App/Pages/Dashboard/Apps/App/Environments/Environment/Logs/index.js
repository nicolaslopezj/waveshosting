import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import SelectLogGroup from './SelectLogGroup'
import SelectLogStream from './SelectLogStream'
import LogStream from './LogStream'

export default class Logs extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route
            path="/dashboard/apps/:appId/:environmentName/logs"
            exact
            component={SelectLogGroup}
          />
          <Route
            path="/dashboard/apps/:appId/:environmentName/logs/:logGroupName"
            exact
            component={SelectLogStream}
          />
          <Route
            path="/dashboard/apps/:appId/:environmentName/logs/:logGroupName/:logStreamName"
            exact
            component={LogStream}
          />
        </Switch>
      </div>
    )
  }
}
