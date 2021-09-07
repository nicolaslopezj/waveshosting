import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Apps from './Apps'
import withRoles from 'App/helpers/auth/withRoles'
import PropTypes from 'prop-types'

@withRoles
export default class Admin extends React.Component {
  static propTypes = {
    roles: PropTypes.array
  }

  render() {
    if (!this.props.roles.includes('admin')) return null
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/admin" exact component={Apps} />
        </Switch>
      </div>
    )
  }
}
