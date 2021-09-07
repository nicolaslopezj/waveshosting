import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import MutationButton from 'App/components/MutationButton'
import Button from 'orionsoft-parts/lib/components/Button'
import {withRouter} from 'react-router'
import LoadingSection from 'App/components/LoadingSection'

@withGraphQL(
  gql`
    query getApp($appId: ID) {
      app(appId: $appId) {
        _id
        environments {
          name
        }
      }
    }
  `,
  {loading: <LoadingSection />}
)
@withRouter
export default class Delete extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    app: PropTypes.object
  }

  hasEnvironments() {
    return this.props.app.environments.length
  }

  renderButton() {
    if (this.hasEnvironments()) {
      return (
        <Button disabled tooltip="You must terminate all your environments first">
          Delete app
        </Button>
      )
    }
    return (
      <MutationButton
        mutation="deleteApp"
        label="Delete app"
        message={
          <span>
            Are you sure you want to delete the application <b>{this.props.app._id}</b>?
          </span>
        }
        title="Delete app"
        confirmText="Delete"
        params={{appId: this.props.app._id}}
        danger
        onSuccess={() => this.props.history.replace(`/dashboard`)}
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Section
          title="Delete app"
          description="To delete an app you must first, delete all the environments">
          <div>
            Delete the app <b>{this.props.app._id}</b>
          </div>
          <br />
          {this.renderButton()}
        </Section>
      </div>
    )
  }
}
