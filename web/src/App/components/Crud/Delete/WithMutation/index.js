import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'

@withApollo
export default class WithMutation extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    children: PropTypes.func,
    params: PropTypes.object,
    mutation: PropTypes.string,
    fragment: PropTypes.any
  }

  getArguments() {
    const keys = Object.keys(this.props.params)
    return keys
      .map(key => {
        const field = this.props.params[key]
        return `$itemId: ${field.__graphQLType}`
      })
      .join(', ')
  }

  getParams() {
    const keys = Object.keys(this.props.params)
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

  getMutationText() {
    return `
      mutation ${this.props.mutation} (${this.getArguments()}) {
        result: ${this.props.mutation}  (${this.getParams()}) ${this.getSubselection()}
      }
    `
  }

  getMutation() {
    const text = this.getMutationText()
    const mutation = gql([text, ''], this.props.fragment || '')
    return async itemId => {
      const {data} = await this.props.client.mutate({
        mutation,
        variables: {itemId}
      })
      return data.result
    }
  }

  render() {
    const mutate = this.getMutation()
    return this.props.children(mutate)
  }
}
