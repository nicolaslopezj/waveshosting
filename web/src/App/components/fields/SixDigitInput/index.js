import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import autobind from 'autobind-decorator'

export default class SixDigitInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    onReady: PropTypes.func
  }

  static defaultProps = {
    autoFocus: true,
    onReady: () => {}
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    }
  }

  @autobind
  focus() {
    if (this.props.value) {
      this.props.onChange('')
    }
    this.refs[`input_0`].focus()
  }

  getNextIndex(value) {
    if (!value) return 0
    if (value.length > 5) return 0
    return value.length
  }

  @autobind
  focusNext() {
    const value = this.props.value
    const index = this.getNextIndex(value)
    this.refs[`input_${index}`].focus()
  }

  isReady() {
    return (this.props.value || '').length === 6
  }

  onChange(event, index) {
    const value = event.target.value || ''
    const oldValue = this.props.value || ''
    const newValue = oldValue + value

    if (newValue.length > 6) {
      const last = newValue[newValue.length - 1]
      this.props.onChange(last)
    } else {
      this.props.onChange(newValue)
    }
    setTimeout(() => {
      if (this.isReady()) {
        this.refs[`input_${index}`].blur()
        setTimeout(() => this.props.onReady(newValue), 200)
      } else {
        this.focusNext()
      }
    }, 1)
  }

  onKeyDown(event, index) {
    if (event.key === 'Backspace') {
      const newVal = (this.props.value || '1').slice(0, -1)
      this.props.onChange(newVal)
      setTimeout(this.focusNext, 1)
    }
  }

  renderInputs() {
    return range(6).map(index => {
      const value = (this.props.value || '')[index] || ''
      return (
        <input
          key={index}
          value={value}
          ref={`input_${index}`}
          className={styles.input}
          placeholder="•"
          onChange={event => this.onChange(event, index)}
          onKeyDown={event => this.onKeyDown(event, index)}
          type="tel"
        />
      )
    })
  }

  render() {
    const className = this.isReady() ? styles.ready : styles.container
    return (
      <div className={className} onClick={this.focus}>
        {this.renderInputs()}
      </div>
    )
  }
}
