import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Button from 'orionsoft-parts/lib/components/Button'
import LoadingSection from 'App/components/LoadingSection'

@withGraphQL(
  gql`
    query getStaticWebsite($staticWebsiteId: ID) {
      staticWebsite(staticWebsiteId: $staticWebsiteId) {
        _id
        environments {
          name
        }
      }
    }
  `,
  {loading: <LoadingSection top />}
)
@withRouter
export default class Terminate extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    staticWebsite: PropTypes.object
  }

  hasEnvironments() {
    return this.props.staticWebsite.environments.length
  }

  renderButton() {
    if (this.hasEnvironments()) {
      return (
        <Button disabled tooltip="You must terminate all your environments first">
          Delete website
        </Button>
      )
    }
    const id = this.props.staticWebsite._id
    return (
      <MutationButton
        mutation="deleteStaticWebsite"
        label="Delete website"
        message={
          <span>
            Are you sure you want to delete the static website <b>{id}</b>?
          </span>
        }
        title="Delete website"
        confirmText="Delete"
        params={{staticWebsiteId: id}}
        danger
        onSuccess={() => this.props.history.replace(`/dashboard/static-websites`)}
      />
    )
  }

  render() {
    const id = this.props.staticWebsite._id
    return (
      <div className={styles.container}>
        <Section
          top
          title="Delete app"
          description="To delete a website you must first, delete all the environments">
          <div>
            Delete the static website <b>{id}</b>
          </div>
          <br />
          {this.renderButton()}
        </Section>
      </div>
    )
  }
}
