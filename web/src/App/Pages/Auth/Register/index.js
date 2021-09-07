import React from 'react'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Button from 'orionsoft-parts/lib/components/Button'
import ObjectField from 'App/components/fields/ObjectField'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import withUserId from 'App/helpers/auth/withUserId'
import LoggedIn from '../LoggedIn'
import {Link} from 'react-router-dom'
import {setSession} from '@orion-js/graphql-client'

@withUserId
export default class Register extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func,
    userId: PropTypes.string
  }

  @autobind
  async onSuccess(session) {
    await setSession(session)
    this.props.onLogin()
  }

  render() {
    if (this.props.userId) return <LoggedIn />
    return (
      <div>
        <AutoForm mutation="createUser" ref="form" onSuccess={this.onSuccess}>
          <Field fieldName="profile" type={ObjectField} style={null}>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="label">Name</div>
                <Field fieldName="firstName" type={Text} placeholder="Name" />
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="label">Last name</div>
                <Field fieldName="lastName" type={Text} placeholder="Last name" />
              </div>
            </div>
          </Field>
          <div className="label">Email</div>
          <Field fieldName="email" type={Text} fieldType="email" placeholder="Email" />
          <div className="label">Password</div>
          <Field fieldName="password" type={Text} fieldType="password" placeholder="Password" />
        </AutoForm>
        <br />
        <Button onClick={() => this.refs.form.submit()} primary>
          Create account
        </Button>
        <br />
        <br />
        <div>
          If you have an account <Link to="/login">Log in</Link>
        </div>
      </div>
    )
  }
}
