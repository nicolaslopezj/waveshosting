import React from 'react'
import Data from './Data'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import getQueryFields from './getQueryFields'
import {getArguments, getParams} from './getParams'
import Head from './Head'
import autobind from 'autobind-decorator'
import debounce from './debounce'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import LoadingIndicator from './LoadingIndicator'

export default class Fetch extends React.Component {
  static propTypes = {
    /**
     * Head title
     */
    headTitle: PropTypes.any,
    /**
     * Head bottom component
     */
    headBottomComponent: PropTypes.func,
    /**
     * Head center component
     */
    headCenterComponent: PropTypes.func,
    /**
     * Head left component
     */
    headLeftComponent: PropTypes.func,
    /**
     * Head right component
     */
    headRightComponent: PropTypes.func,
    /**
     * Name of the query. Ex: backendEvents, producers
     */
    queryName: PropTypes.string.isRequired,
    /**
     * Fields to display
     */
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title in the header
         */
        title: PropTypes.string,
        /**
         * A render function
         * Args: (value, doc, index)
         */
        render: PropTypes.func,
        /**
         * Name of the field
         */
        name: PropTypes.string.isRequired,
        /**
         * The default sort when activated. If present it can sort by this field. ASC or DESC
         */
        sort: PropTypes.string,
        /**
         * If this is the default field to sort, the value should be the sort type. ASC or DESC
         */
        defaultSort: PropTypes.string
      })
    ).isRequired,
    /**
     * Extra fields to bring
     */
    extraFields: PropTypes.arrayOf(PropTypes.string),
    /**
     * Declare the graphql params for the query
     */
    params: PropTypes.object,
    /**
     * When use choose the item
     */
    onPress: PropTypes.func,
    /**
     * Apollo poll interval for refetch, default to 20s. Set to null to deactivate. In seconds
     */
    pollInterval: PropTypes.number,
    /**
     * Pass the id of the selected item to highlight then in the table
     */
    selectedItemId: PropTypes.string,
    /**
     * Default limit
     */
    defaultLimit: PropTypes.number,
    /**
     * Loading component
     */
    loadingComponent: PropTypes.any
  }

  static defaultProps = {
    headCenterComponent: () => <div />,
    headBottomComponent: () => <div />,
    onPress: () => {},
    pollInterval: 0,
    defaultLimit: 10,
    loadingComponent: LoadingIndicator
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      limit: this.props.defaultLimit,
      variables: {}
    }
    this.createChild(props)
  }

  // public reload function
  async reload() {
    return this.refs.child.refs.child.queryObservable.refetch()
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = this.getQuery(nextProps)
    const currentQuery = this.getQuery(this.props)
    if (newQuery !== currentQuery) {
      this.createChild(nextProps)
    }

    const newVariables = this.getVariables(nextProps)
    const currentVariables = this.getVariables(this.props)
    if (!isEqual(newVariables, currentVariables) && this.state.page !== 1) {
      this.setState({page: 1})
    }
  }

  createChild(props) {
    const queryContainer = graphql(gql([this.getQuery(props)]), {
      options: ({variables}) => {
        return {
          variables,
          fetchPolicy: 'network-only',
          pollInterval: this.props.pollInterval ? this.props.pollInterval : null
        }
      }
    })
    const child = queryContainer(Data)
    this.Child = debounce(child)
  }

  getQuery(props) {
    return `query paginated_${props.queryName} (${getArguments(props.params)}) {
      result: ${props.queryName} (
        ${getParams(props.params)}
      ) {
        _id
        totalCount
        totalPages
        hasNextPage
        hasPreviousPage
        items ${getQueryFields(props.fields, props.extraFields)}
      }
    }`
  }

  getDefaultSort() {
    for (const field of this.props.fields) {
      if (field.defaultSort) {
        return {
          sortBy: field.name,
          sortType: field.defaultSort
        }
      }
    }
    return {}
  }

  getVariables(props) {
    const defaultSort = this.getDefaultSort()
    const variables = {
      limit: this.state.limit,
      page: this.state.page,
      sortBy: this.state.sortBy || defaultSort.sortBy,
      sortType: this.state.sortType || defaultSort.sortType,
      ...this.state.variables
    }
    return variables
  }

  @autobind
  setVariable(key, value) {
    const variables = this.state.variables
    variables[key] = value
    this.setState({variables, page: 1})
  }

  @autobind
  setSort(sortBy, sortType) {
    this.setState({sortBy, sortType})
  }

  render() {
    const variables = this.getVariables(this.props)
    return (
      <div className="paginated-root">
        <Head
          ref="head"
          title={this.props.headTitle}
          bottomComponent={this.props.headBottomComponent}
          leftComponent={this.props.headLeftComponent}
          centerComponent={this.props.headCenterComponent}
          rightComponent={this.props.headRightComponent}
          variables={variables}
          setVariable={this.setVariable}
        />
        <this.Child
          ref="child"
          selectedItemId={this.props.selectedItemId}
          variables={variables}
          onPress={this.props.onPress}
          fields={this.props.fields}
          sortBy={variables.sortBy}
          sortType={variables.sortType}
          setSort={this.setSort}
          page={variables.page}
          setPage={page => this.setState({page})}
          limit={variables.limit}
          setLimit={limit => this.setState({limit})}
          loadingComponent={this.props.loadingComponent}
        />
      </div>
    )
  }
}
