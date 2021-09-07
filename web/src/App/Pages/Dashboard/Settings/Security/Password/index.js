import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'orionsoft-parts/lib/components/Button'
import {Field} from 'simple-react-form'
import AutoForm from 'App/components/AutoForm'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'
import LockIcon from 'react-icons/lib/md/lock'

@withMessage
export default class ChangePassword extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  schema = {
    oldPassword: {
      type: String,
      label: 'Current password'
    },
    newPassword: {
      type: String,
      min: 8,
      label: 'New password'
    },
    confirm: {
      type: String,
      custom(
        confirm,
        {
          doc: {newPassword}
        }
      ) {
        if (confirm !== newPassword) {
          return 'passwordsDontMatch'
        }
      },
      label: 'Confirm the new password'
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Section title="Change password" description="Change your password">
          <AutoForm
            mutation="changePassword"
            ref="form"
            onSuccess={() => this.props.showMessage('Your password was changed')}
            schema={this.schema}>
            <div className="label">Current password</div>
            <Field
              fieldName="oldPassword"
              fieldType="password"
              placeholder="Current password"
              type={Text}
            />
            <div className={styles.divider} />
            <div className="label">New password</div>
            <Field
              fieldName="newPassword"
              fieldType="password"
              placeholder="New password"
              type={Text}
            />
            <div className="description">Your password must have at least 6 characters</div>
            <div className="label">Confirm your password</div>
            <Field
              fieldName="confirm"
              fieldType="password"
              placeholder="Repeat your new password"
              type={Text}
            />
          </AutoForm>
          <br />
          <Button icon={LockIcon} onClick={() => this.refs.form.submit()} primary>
            Change password
          </Button>
        </Section>
      </div>
    )
  }
}
