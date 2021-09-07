import React from 'react'
import formatNumber from '../formatNumber'
import BeforeIcon from 'react-icons/lib/md/chevron-left'
import NextIcon from 'react-icons/lib/md/chevron-right'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

export default class Page extends React.Component {
  static propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func,
    result: PropTypes.object
  }

  state = {page: 1}

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.setState({page: nextProps.page})
    }
  }

  @autobind
  onPageBlur(event) {
    this.props.setPage(Number(event.target.value))
  }

  @autobind
  onKeyPress(event) {
    const code = event.keyCode || event.which
    if (code === 13) {
      this.props.setPage(Number(event.target.value))
    }
  }

  render() {
    return (
      <div>
        <div
          className={
            this.props.result.hasPreviousPage
              ? 'paginated-pagination-page-icon'
              : 'paginated-pagination-page-icon-disabled'
          }
          onClick={() =>
            this.props.result.hasPreviousPage && this.props.setPage(this.props.page - 1)}>
          <BeforeIcon size={25} />
        </div>
        <div className="paginated-pagination-page-input-container">
          page{' '}
          <input
            name="pageInput"
            value={this.state.page}
            onChange={event => this.setState({page: event.target.value})}
            onKeyPress={this.onKeyPress}
            onBlur={this.onPageBlur}
            className="paginated-pagination-page-input"
          />{' '}
          of {formatNumber(this.props.result.totalPages)}
        </div>
        <div
          className={
            this.props.result.hasNextPage
              ? 'paginated-pagination-page-icon'
              : 'paginated-pagination-page-icon-disabled'
          }
          onClick={() => this.props.result.hasNextPage && this.props.setPage(this.props.page + 1)}>
          <NextIcon size={25} />
        </div>
      </div>
    )
  }
}
