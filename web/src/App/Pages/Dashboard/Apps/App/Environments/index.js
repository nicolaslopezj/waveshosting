import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import List from './List'
import Environment from './Environment'

export default class Environments extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/dashboard/apps/:appId" exact component={List} />
          <Route path="/dashboard/apps/:appId/:environmentName" component={Environment} />
        </Switch>
      </div>
    )
  }
}
