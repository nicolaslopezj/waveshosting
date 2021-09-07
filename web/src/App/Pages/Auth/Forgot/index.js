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

@withUserId
@withMessage
export default class ForgotPassword extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    userId: PropTypes.string
  }

  @autobind
  onSuccess() {
    this.props.showMessage('Please follow the instructions in your email')
  }

  render() {
    if (this.props.userId) return <LoggedIn />
    return (
      <div>
        <AutoForm mutation="forgotPassword" ref="form" onSuccess={this.onSuccess}>
          <div className="label">Email</div>
          <Field
            fieldName="email"
            type={Text}
            placeholder="The email of your account"
            fieldType="email"
          />
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
