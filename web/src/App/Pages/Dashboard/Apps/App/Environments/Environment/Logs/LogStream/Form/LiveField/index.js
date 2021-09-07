import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'

export default class LiveField extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func
  }

  render() {
    const live = this.props.value
    const color = live ? '#0069ff' : 'gray'
    const tooltip = live ? 'Showing live logs' : 'Showing logs by date'
    return (
      <Tooltip content={tooltip}>
        <div className={styles.container} onClick={() => this.props.onChange(!live)}>
          <div className={styles.colorContainer}>
            <div className={styles.color} style={{background: color}} />
          </div>
          <div>Filter logs</div>
        </div>
      </Tooltip>
    )
  }
}
