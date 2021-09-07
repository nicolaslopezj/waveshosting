import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import getContrastColor from 'App/helpers/colors/getContrastColor'

export default class App extends React.Component {
  static propTypes = {
    app: PropTypes.object
  }

  render() {
    const {app} = this.props
    return (
      <Link className={styles.container} to={`/dashboard/apps/${app._id}`}>
        <div className={styles.region}>{app.region}</div>
        <div className={styles.name}>{app._id}</div>
        <div>
          <div
            className={styles.platform}
            style={{
              background: app.platform.color,
              color: getContrastColor(app.platform.color) === 'black' ? '#111' : '#fff'
            }}>
            {app.platform.name}
          </div>
          {!app.isOwner && (
            <div
              className={styles.platform}
              style={{
                background: '#0f2ff1',
                color: '#fff'
              }}>
              Invited
            </div>
          )}
        </div>
      </Link>
    )
  }
}
