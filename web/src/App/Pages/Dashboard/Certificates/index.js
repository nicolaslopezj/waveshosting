import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Main from './Main'
import List from './List'
import Create from './Create'
import Certificate from './Certificate'

export default class MainCertificates extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/dashboard/certificates" exact component={Main} />
          <Route path="/dashboard/certificates/:credentialId/:region" exact component={List} />
          <Route path="/dashboard/certificates/:credentialId/:region/create" component={Create} />
          <Route
            path="/dashboard/certificates/:credentialId/:region/:certificateId"
            component={Certificate}
          />
        </Switch>
      </div>
    )
  }
}
