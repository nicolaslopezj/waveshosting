import React from 'react'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

@withGraphQL(gql`
  query getParams($name: ID) {
    params(name: $name, mutation: false) {
      params
      name
      result
      basicResultQuery
    }
  }
`)
export default class WithParams extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    params: PropTypes.object
  }

  render() {
    return this.props.children(this.props.params)
  }
}
