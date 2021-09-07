import React from 'react'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Content from 'App/components/Content'
import Section from 'App/components/Section'
import AutoForm from 'App/components/AutoForm'
import {withRouter} from 'react-router'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {Field} from 'simple-react-form'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import {Link} from 'react-router-dom'
import Button from 'orionsoft-parts/lib/components/Button'
import MutationButton from 'App/components/MutationButton'

@withGraphQL(gql`
  query getMyCredentials {
    credentials {
      value: _id
      label: name
    }
  }
`)
@withRouter
export default class Transfer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    credentials: PropTypes.array,
    match: PropTypes.object
  }

  render() {
    const {appId} = this.props.match.params
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/dashboard': 'My Apps'}}>Transfer</Breadcrumbs>
        <div className="divider" />
        <Content>
          <Section top title="Transfer app" description="Choose the settings to import this app">
            <AutoForm
              mutation="acceptAppTransfer"
              ref="form"
              doc={{appId}}
              onSuccess={app => this.props.history.push(`/dashboard/apps/${app._id}`)}>
              <div>
                <b>{appId}</b>
              </div>
              <div className="label">Credential</div>
              <Field
                fieldName="credentialId"
                type={Select}
                options={this.props.credentials}
                placeholder="Select the credential"
              />
              <div className="description">
                Which credential you want to use in this app.{' '}
                <Link to="/settings/credentials/add">Create credential</Link>
              </div>
            </AutoForm>
            <br />
            <MutationButton
              mutation="rejectAppTransfer"
              label="Reject"
              message={
                <span>
                  Are you sure you want to reject the transfer of the application <b>{appId}</b>?
                </span>
              }
              title="Reject transfer"
              confirmText="Reject transfer"
              params={{appId}}
              danger
              onSuccess={app => this.props.history.push(`/dashboard`)}
            />
            <Button onClick={() => this.refs.form.submit()} primary>
              Accept app
            </Button>
          </Section>
        </Content>
      </div>
    )
  }
}
