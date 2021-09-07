import React from 'react'
import Layout from '../Layout'
import Section from 'App/components/Section'
import {withRouter} from 'react-router'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import LoadingSection from 'App/components/LoadingSection'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import {Link} from 'react-router-dom'
import Button from 'orionsoft-parts/lib/components/Button'

@withRouter
@withGraphQL(
  gql`
    query getCreateAppOptions {
      canCreateAnApp
      credentials {
        value: _id
        label: name
      }
      staticWebsitePlatforms {
        value: _id
        label: name
      }
    }
  `,
  {loading: null}
)
export default class Create extends React.Component {
  static propTypes = {
    canCreateAnApp: PropTypes.bool,
    history: PropTypes.object,
    credentials: PropTypes.array,
    loading: PropTypes.bool,
    staticWebsitePlatforms: PropTypes.array
  }

  renderContent() {
    return (
      <Section
        title="Create static website"
        description="Website basic configuration, you can't change this later"
        top>
        <AutoForm
          mutation="createStaticWebsite"
          ref="form"
          onSuccess={app => this.props.history.push(`/dashboard/static-websites/${app._id}`)}>
          <div className="label">Name</div>
          <Field fieldName="_id" type={Text} />
          <div className="description">
            A name for this app. Lowercase and only letters and {'"'}-{'"'}. Names must be unique
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

          <div className="label">Platform</div>
          <Field
            fieldName="platformId"
            type={Select}
            options={this.props.staticWebsitePlatforms}
            placeholder="Choose a platform"
          />
          <div className="description">Choose which platform is your app</div>
        </AutoForm>
        <br />
        <Button to="/dashboard/static-websites" style={{marginRight: 10}}>
          Cancel
        </Button>
        <Button onClick={() => this.refs.form.submit()} primary>
          Save
        </Button>
      </Section>
    )
  }

  render() {
    const {loading, canCreateAnApp} = this.props
    if (!loading && !canCreateAnApp) {
      this.props.history.replace('/dashboard/subscribe')
    }
    return (
      <Layout past={{'/dashboard/static-websites': 'Static Websites'}} title="Create">
        {loading ? <LoadingSection top /> : this.renderContent()}
      </Layout>
    )
  }
}
