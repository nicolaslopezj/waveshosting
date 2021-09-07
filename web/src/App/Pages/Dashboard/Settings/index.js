import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Profile from './Profile'
import Tabs from 'orionsoft-parts/lib/components/Tabs'
import PropTypes from 'prop-types'
import Credentials from './Credentials'
import Content from 'App/components/Content'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Security from './Security'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        <div className={styles.header}>
          <Breadcrumbs>Settings</Breadcrumbs>
          <br />
          <Tabs
            items={[
              {title: 'Profile', path: '/settings'},
              {title: 'Credentials', path: '/settings/credentials'},
              {title: 'Security', path: '/settings/security'}
            ]}
          />
        </div>
        <Content>
          <Switch>
            <Route exact path="/settings" component={Profile} />
            <Route path="/settings/credentials" component={Credentials} />
            <Route path="/settings/security" component={Security} />
          </Switch>
        </Content>
      </div>
    )
  }
}
