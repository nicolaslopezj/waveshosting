import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import AutoForm from 'App/components/AutoForm'
import Section from 'App/components/Section'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import {Field} from 'simple-react-form'
import MutationButton from 'App/components/MutationButton'
import {withRouter} from 'react-router'
import LoadingSection from 'App/components/LoadingSection'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import DeleteIcon from 'react-icons/lib/md/delete'

@withGraphQL(
  gql`
    query getAppCollaborators($appId: ID) {
      me {
        _id
      }
      app(appId: $appId) {
        _id
        isOwner
        owner {
          _id
          name
          email
        }
        collaborators {
          _id
          name
          email
        }
      }
    }
  `,
  {loading: <LoadingSection top />}
)
@withMessage
@withRouter
class Invite extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    app: PropTypes.object,
    history: PropTypes.object,
    appId: PropTypes.string,
    refech: PropTypes.func,
    me: PropTypes.object,
    refetch: PropTypes.func
  }

  state = {}

  renderInvited() {
    const {appId, app} = this.props
    const users = app.collaborators.map(user => {
      return (
        <div key={user.email} className={styles.userContainer}>
          <div>
            {user.name} {'<'}
            {user.email}
            {'>'}
          </div>
          {app.isOwner && (
            <div>
              <MutationButton
                mutation="removeUserFromApp"
                params={{appId, userId: user._id}}
                component={props => <IconButton {...props} icon={DeleteIcon} />}
                message={
                  <span>
                    Are you sure you want to remove <b>{user.email}</b> from <b>{appId}</b>?
                  </span>
                }
                title="Remove user"
                confirmText="Remove"
                onSuccess={() => this.props.refetch()}
                danger
              />
            </div>
          )}
        </div>
      )
    })
    return users
  }

  renderInviteUser() {
    return (
      <AutoForm
        mutation="addUserToApp"
        ref="form"
        doc={{appId: this.props.appId}}
        omit="appId"
        onSuccess={() => {
          this.refs.form.form.resetState()
          this.props.refetch()
        }}>
        <div className="row">
          <div className="col-xs-9">
            <Field fieldName="email" type={Text} />
          </div>
          <div className="col-xs-3">
            <div style={{height: '66px', lineHeight: '60px'}}>
              <Button onClick={() => this.refs.form.submit()} primary>
                Add user
              </Button>
            </div>
          </div>
        </div>
      </AutoForm>
    )
  }

  renderOwner() {
    const {owner} = this.props.app
    return (
      <div className={styles.userContainer}>
        <div>
          {owner.name} {'<'}
          {owner.email}
          {'>'}
        </div>
        <div className={styles.owner}>Owner</div>
      </div>
    )
  }

  renderViewer() {
    return (
      <Section top title="Collaborators" description="Invite other users to manage this app">
        <div>Collaborators of this app</div>
        <br />
        {this.renderOwner()}
        {this.renderInvited()}
      </Section>
    )
  }

  render() {
    if (!this.props.app.isOwner) return this.renderViewer()
    return (
      <div className={styles.container}>
        <Section top title="Collaborators" description="Invite other users to manage this app">
          <div>
            <div>
              Invite people to manage <b>{this.props.appId}</b>
            </div>
          </div>
          <br />
          {this.renderOwner()}
          {this.renderInvited()}
          {this.renderInviteUser()}
        </Section>
      </div>
    )
  }
}

export default Invite
