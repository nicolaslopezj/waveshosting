import React from 'react'
import PropTypes from 'prop-types'

export default class Text extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    fieldType: PropTypes.string,
    passProps: PropTypes.object,
    placeholder: PropTypes.node,
    errorMessage: PropTypes.node
  }

  static defaultProps = {
    fieldType: 'text'
  }

  render () {
    return (
      <div className='paginated-text-field'>
        <input
          className='paginated-text-field-input'
          type={this.props.fieldType}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={event => this.props.onChange(event.target.value)}
          {...this.props.passProps} />
        <div className='paginated-text-field-error'>{this.props.errorMessage}</div>
      </div>
    )
  }

}
