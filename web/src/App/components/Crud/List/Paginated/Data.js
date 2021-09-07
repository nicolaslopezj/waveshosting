import React from 'react'
import Pagination from './Pagination'
import Table from './Table'
import Message from './Message'
import PropTypes from 'prop-types'

export default class Data extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    fields: PropTypes.array,
    onPress: PropTypes.func,
    sortBy: PropTypes.string,
    sortType: PropTypes.string,
    setSort: PropTypes.func,
    debouncing: PropTypes.bool,
    selectedItemId: PropTypes.string,
    loadingComponent: PropTypes.any
  }

  renderLoading() {
    if (!this.props.loadingComponent) return <span />
    return <this.props.loadingComponent />
  }

  renderNotFound() {
    return <Message message="No items found" />
  }

  renderError() {
    let message = 'Error'
    if (
      this.props.data.error &&
      this.props.data.error.graphQLErrors &&
      this.props.data.error.graphQLErrors[0]
    ) {
      message = this.props.data.error.graphQLErrors[0].message
    }
    return <Message message={message} />
  }

  renderTable() {
    if (this.props.debouncing) return this.renderLoading()
    if (this.props.data.loading) return this.renderLoading()
    if (!this.props.data.result.items || this.props.data.result.items.length === 0) {
      return this.renderNotFound()
    }
    return (
      <div ref="items">
        <Table
          sortBy={this.props.sortBy}
          sortType={this.props.sortType}
          setSort={this.props.setSort}
          onSelect={this.props.onPress}
          selectedItemId={this.props.selectedItemId}
          items={this.props.data.result.items}
          fields={this.props.fields}
        />
      </div>
    )
  }

  render() {
    if (!this.props.data.result) {
      if (
        (this.props.data.networkStatus === 1 && Object.keys(this.props.data).length === 10) ||
        this.props.data.networkStatus === 2
      ) {
        return this.renderLoading()
      } else {
        return this.renderError()
      }
    }
    return (
      <div className="paginated-container box">
        {this.renderTable()}
        <Pagination {...this.props} result={this.props.data.result} />
      </div>
    )
  }
}
