import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import List from './List'
import Add from './Add'

export default class Credentials extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/settings/credentials" exact component={List} />
          <Route path="/settings/credentials/add" component={Add} />
        </Switch>
      </div>
    )
  }
}
