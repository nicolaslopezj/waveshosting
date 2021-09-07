import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import getContrastColor from 'App/helpers/colors/getContrastColor'

export default class StaticWebsite extends React.Component {
  static propTypes = {
    staticWebsite: PropTypes.object
  }

  render() {
    const {staticWebsite} = this.props
    return (
      <Link className={styles.container} to={`/dashboard/static-websites/${staticWebsite._id}`}>
        <div className={styles.region}>{staticWebsite.region}</div>
        <div className={styles.name}>{staticWebsite._id}</div>
        <div>
          <div
            className={styles.platform}
            style={{
              background: staticWebsite.platform.color,
              color: getContrastColor(staticWebsite.platform.color) === 'black' ? '#111' : '#fff'
            }}>
            {staticWebsite.platform.name}
          </div>
        </div>
      </Link>
    )
  }
}
