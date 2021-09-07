import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import List from './List'
import Create from './Create'
import StaticWebsite from './StaticWebsite'

export default class StaticWebsites extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/dashboard/static-websites" exact component={List} />
          <Route path="/dashboard/static-websites/create" component={Create} />
          <Route path="/dashboard/static-websites/:staticWebsiteId" component={StaticWebsite} />
        </Switch>
      </div>
    )
  }
}
