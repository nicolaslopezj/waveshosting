import React from 'react'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Button from 'orionsoft-parts/lib/components/Button'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import withUserId from 'App/helpers/auth/withUserId'
import LoggedIn from '../LoggedIn'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import {setSession} from '@orion-js/graphql-client'

@withUserId
@withMessage
export default class ResetPassword extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    onLogin: PropTypes.func,
    userId: PropTypes.string,
    token: PropTypes.string
  }

  schema = {
    password: {
      type: String,
      min: 8
    },
    confirm: {
      type: String,
      custom(
        confirm,
        {
          doc: {password}
        }
      ) {
        if (confirm !== password) {
          return 'passwordsDontMatch'
        }
      }
    },
    token: {
      type: String
    }
  }

  @autobind
  async onSuccess(session) {
    await setSession(session)
    this.props.showMessage('Your password has been changed')
    this.props.onLogin()
  }

  @autobind
  onValidationError({token}) {
    if (token === 'tokenNotFound') {
      this.props.showMessage('The reset link is expired, please start again')
    }
  }

  render() {
    if (this.props.userId) return <LoggedIn />
    return (
      <div>
        <AutoForm
          doc={{token: this.props.token}}
          mutation="resetPassword"
          ref="form"
          schema={this.schema}
          onSuccess={this.onSuccess}
          onValidationError={this.onValidationError}>
          <div className="label">New password</div>
          <Field fieldName="password" fieldType="password" placeholder="New Password" type={Text} />
          <div className="description">Your password must be at least 8 characters long</div>
          <div className="label">Confirm password</div>
          <Field fieldName="confirm" fieldType="password" placeholder="Confirm" type={Text} />
        </AutoForm>
        <br />
        <Button onClick={() => this.refs.form.submit()} primary>
          Reset Password
        </Button>
        <br />
        <br />
      </div>
    )
  }
}
