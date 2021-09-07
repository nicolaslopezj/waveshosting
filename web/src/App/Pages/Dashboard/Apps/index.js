import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Create from './Create'
import App from './App'
import List from './List'
import Transfer from './Transfer'

export default class Apps extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/dashboard/apps" exact component={List} />
          <Route path="/dashboard/apps/create" component={Create} />
          <Route path="/dashboard/apps/transfer/:appId" component={Transfer} />
          <Route path="/dashboard/apps/:appId" component={App} />
        </Switch>
      </div>
    )
  }
}
