import React from 'react'
import styles from './styles.css'
import HasTwoFactorIcon from 'react-icons/lib/md/lock'
import Button from 'orionsoft-parts/lib/components/Button'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withMutation(gql`
  mutation disableTwoFactor {
    disableTwoFactor {
      _id
      hasTwoFactor
    }
  }
`)
@withMessage
export default class Disable extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    disableTwoFactor: PropTypes.func
  }

  @autobind
  async disableTwoFactor() {
    try {
      await this.props.disableTwoFactor()
      this.props.showMessage('Two factor authentication has been disabled correctly')
    } catch (error) {
      this.props.showMessage(error)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <HasTwoFactorIcon size={28} className={styles.twoFactorActivatedIcon} />
        <span className={styles.twoFactorActivatedText}>
          Two factor authentication activated
        </span>
        <div className={styles.yourAccountIsSecure}>Your account is safer</div>
        <br />
        <Button danger onClick={this.disableTwoFactor}>
          Disable
        </Button>
      </div>
    )
  }
}
