import React from 'react'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import styles from './styles.css'
import Loading from 'orionsoft-parts/lib/components/Loading'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import {setSession} from '@orion-js/graphql-client'

@withMutation(gql`
  mutation verifyEmail($token: String) {
    session: verifyEmail(token: $token) {
      _id
      userId
      roles
      publicKey
      secretKey
    }
  }
`)
export default class VerifyEmail extends React.Component {
  static propTypes = {
    verifyEmail: PropTypes.func,
    token: PropTypes.object,
    onLogin: PropTypes.func
  }

  state = {}

  componentDidMount() {
    this.verify()
  }

  @autobind
  async verify() {
    await sleep(2000)
    try {
      const {session} = await this.props.verifyEmail({
        token: this.props.token
      })
      await setSession(session)
      this.props.onLogin()
    } catch (error) {
      if (error.message.includes('Validation Error')) {
        this.setState({errorMessage: 'The verification code expired'})
      } else {
        this.setState({errorMessage: error.message})
      }
    }
  }

  render() {
    if (this.state.errorMessage) {
      return <div className={styles.error}>{this.state.errorMessage}</div>
    }
    return (
      <div className={styles.loading}>
        <Loading size={40} />
        <p>We are verifying your email</p>
      </div>
    )
  }
}
