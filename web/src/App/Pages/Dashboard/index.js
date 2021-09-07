import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import {Route, Switch, Redirect} from 'react-router-dom'
import Settings from './Settings'
import Apps from './Apps'
import forceLogin from 'App/helpers/auth/forceLogin'
import Certificates from './Certificates'
import StaticWebsites from './StaticWebsites'
import Admin from './Admin'

@forceLogin
export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className={styles.container}>
        <Navbar />
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/admin" component={Admin} />
          <Route path="/dashboard/apps" component={Apps} />
          <Route path="/dashboard/certificates" component={Certificates} />
          <Route path="/dashboard/static-websites" component={StaticWebsites} />
          <Redirect path="/dashboard" to="/dashboard/apps" />
        </Switch>
      </div>
    )
  }
}
