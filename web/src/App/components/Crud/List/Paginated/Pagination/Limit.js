import React from 'react'
import formatNumber from '../formatNumber'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

export default class Component extends React.Component {
  static propTypes = {
    limit: PropTypes.number,
    setLimit: PropTypes.func,
    result: PropTypes.object
  }

  @autobind
  onChange(event) {
    this.props.setLimit(Number(event.target.value))
  }

  renderSelect() {
    return (
      <select
        className="paginated-pagination-select"
        value={this.props.limit}
        onChange={this.onChange}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={200}>200</option>
      </select>
    )
  }

  render() {
    return (
      <div>
        Show {this.renderSelect()} of {formatNumber(this.props.result.totalCount)}
      </div>
    )
  }
}
