import React from 'react'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import SearchIcon from 'react-icons/lib/md/search'

export default class TextField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  state = {}

  @autobind
  onChange(event) {
    this.setState({value: event.target.value})
  }

  @autobind
  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onChange(this.state.value)
    }
  }

  @autobind
  onBlur(event) {
    this.props.onChange(this.state.value)
  }

  @autobind
  focus() {
    this.refs.input.focus()
  }

  render() {
    return (
      <div className={styles.container} onClick={this.focus}>
        <div className={styles.icon}>
          <SearchIcon size={20} />
        </div>
        <input
          ref="input"
          value={this.state.value}
          onChange={this.onChange}
          className={styles.input}
          onKeyPress={this.onKeyPress}
          onBlur={this.onBlur}
          type="text"
          placeholder="Filter logs"
        />
      </div>
    )
  }
}
