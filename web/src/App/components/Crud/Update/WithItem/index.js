import React from 'react'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'
import Item from './Item'

@withApollo
export default class WithItem extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    children: PropTypes.func,
    fragment: PropTypes.any,
    itemId: PropTypes.string,
    queryInfo: PropTypes.object
  }

  state = {}

  componentDidMount() {
    this.createComponent()
  }

  createComponent() {
    const query = this.getQuery()
    const Component = withGraphQL(query)(Item)
    this.setState({Component})
  }

  getArguments() {
    const keys = Object.keys(this.props.queryInfo.params)
    return keys
      .map(key => {
        const field = this.props.queryInfo.params[key]
        return `$itemId: ${field.__graphQLType}`
      })
      .join(', ')
  }

  getParams() {
    const keys = Object.keys(this.props.queryInfo.params)
    return keys
      .map(key => {
        return `${key}: $itemId`
      })
      .join(', ')
  }

  getSubselection() {
    const fragment = this.props.fragment
    if (!fragment) return ''
    const fragmentName = fragment.definitions[0].name.value
    return `{...${fragmentName}}`
  }

  getQueryText() {
    return `
      query ${this.props.queryInfo.name} (${this.getArguments()}) {
        item: ${this.props.queryInfo.name}  (${this.getParams()}) ${this.getSubselection()}
      }
    `
  }

  getQuery() {
    const text = this.getQueryText()
    const fragment = this.props.fragment || ''
    const query = gql([text, ''], fragment)
    return query
  }

  render() {
    if (!this.state.Component) return <span />
    return (
      <this.state.Component itemId={this.props.itemId}>{this.props.children}</this.state.Component>
    )
  }
}
