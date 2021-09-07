import React from 'react'
import PropTypes from 'prop-types'
import Textarea from 'orionsoft-parts/lib/components/fields/Textarea'
import autobind from 'autobind-decorator'

export default class MeteorSettings extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
  }

  getJSONValue() {
    try {
      const json = JSON.parse(this.getStringValue())
      return JSON.stringify(json, null, 2)
    } catch (e) {}
  }

  getStringValue() {
    const {value} = this.props
    if (!value) return ''
    return decodeURIComponent(value)
  }

  @autobind
  onChange(newValue) {
    this.props.onChange(encodeURIComponent(newValue))
  }

  render() {
    return <Textarea onChange={this.onChange} value={this.getStringValue()} />
  }
}
