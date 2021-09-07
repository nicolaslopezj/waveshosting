import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import DateIcon from 'react-icons/lib/md/event'
import ClearIcon from 'react-icons/lib/md/clear'
import autobind from 'autobind-decorator'

export default class Element extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string,
    parent: PropTypes.any
  }

  @autobind
  onClickIcon() {
    if (this.props.value) {
      this.props.parent.props.onChange(null)
    } else {
      this.props.onClick()
    }
  }

  render() {
    const Icon = this.props.value ? ClearIcon : DateIcon
    return (
      <div className={styles.container}>
        <div className={styles.icon} onClick={this.onClickIcon}>
          <Icon size={20} />
        </div>
        <div className={styles.text} onClick={this.props.onClick}>
          {this.props.value || 'Select a start date'}
        </div>
      </div>
    )
  }
}
