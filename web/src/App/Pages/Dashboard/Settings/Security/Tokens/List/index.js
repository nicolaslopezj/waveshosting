import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Token from './Token'

@withGraphQL(gql`
  query getMyTokens {
    tokens {
      items {
        _id
        name
        key
        lastCall
        createdAt
      }
    }
  }
`)
export default class List extends React.Component {
  static propTypes = {
    tokens: PropTypes.object,
    refetch: PropTypes.func
  }

  renderTokens() {
    return this.props.tokens.items.map(token => {
      return <Token refetch={this.props.refetch} token={token} key={token._id} />
    })
  }

  render() {
    return <div className={styles.container}>{this.renderTokens()}</div>
  }
}
