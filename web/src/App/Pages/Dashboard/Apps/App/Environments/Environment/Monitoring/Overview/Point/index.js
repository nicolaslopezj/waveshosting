import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import isNil from 'lodash/isNil'
import bytesToSize from 'App/helpers/convert/bytesToSize'

export default class Point extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  renderValue(value, unit) {
    if (isNil(value)) {
      return 'No data'
    } else if (unit === 'percentage') {
      return value.toFixed(2) + '%'
    } else if (unit === 'text') {
      return value || 'No data'
    } else if (unit === 'seconds') {
      if (value < 5) {
        return (value * 1000).toFixed(2) + 'ms'
      } else {
        return value.toFixed(2) + 's'
      }
    } else if (unit === 'count') {
      return value
    } else if (unit === 'bytes') {
      return bytesToSize(value)
    } else {
      return 'unkown'
    }
  }

  render() {
    const {label, unit} = this.props.data
    return (
      <div className={styles.container}>
        <div className={styles.value}>{this.renderValue(this.props.data[unit], unit)}</div>
        <div className={styles.label}>{label}</div>
      </div>
    )
  }
}
