import React from 'react'
import styles from './styles.css'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Button from 'orionsoft-parts/lib/components/Button'

@withMutation(gql`
  mutation createToken {
    createToken {
      _id
      name
      key
    }
  }
`)
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    createToken: PropTypes.func
  }

  @autobind
  async createToken() {
    try {
      await this.props.createToken(
        {},
        {
          refetchQueries: ['getMyTokens']
        }
      )
      this.props.showMessage('The token was created')
    } catch (error) {
      this.props.showMessage(error)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Button primary onClick={this.createToken}>
          Create a new token
        </Button>
      </div>
    )
  }
}
