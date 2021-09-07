import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

export default class Section extends React.Component {
  static propTypes = {
    top: PropTypes.bool
  }

  render() {
    return (
      <div className={this.props.top ? styles.containerNoBorder : styles.container}>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <div className={styles.title} />
            <div className={styles.description} />
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className={styles.children} />
          </div>
        </div>
      </div>
    )
  }
}
