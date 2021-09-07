import React from 'react'
import {ObjectComponent} from 'simple-react-form'
import PropTypes from 'prop-types'

export default class ObjectField extends ObjectComponent {
  static propTypes = {
    ...ObjectComponent.propTypes,
    style: PropTypes.object
  }

  static defaultProps = {
    ...ObjectComponent.defaultProps,
    style: {}
  }

  renderLabel() {
    if (!this.props.label) return
    return (
      <div>
        <b>{this.props.label}</b>
      </div>
    )
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return <div style={{color: 'red'}}>{this.props.errorMessage}</div>
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.renderLabel()}
        {this.getChildrenComponents()}
        {this.renderErrorMessage()}
      </div>
    )
  }
}
