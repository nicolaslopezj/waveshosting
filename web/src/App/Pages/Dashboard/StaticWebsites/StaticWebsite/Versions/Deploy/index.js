import React from 'react'
import Section from 'App/components/Section'
import AutoForm from 'App/components/AutoForm'
import Button from 'orionsoft-parts/lib/components/Button'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {Field} from 'simple-react-form'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import {withRouter} from 'react-router'
import autobind from 'autobind-decorator'
import Layout from '../../Layout'

@withMessage
@withRouter
@withGraphQL(gql`
  query app($staticWebsiteId: ID) {
    staticWebsite(staticWebsiteId: $staticWebsiteId) {
      _id
      environments {
        value: name
        label: name
      }
    }
  }
`)
export default class Deploy extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    showMessage: PropTypes.func,
    staticWebsite: PropTypes.object,
    match: PropTypes.object
  }

  @autobind
  onSuccess() {
    this.props.showMessage('Deploy in progress')
    this.props.history.push(`/dashboard/static-websites/${this.props.staticWebsite._id}`)
  }

  render() {
    if (!this.props.staticWebsite) return null

    const {versionNumber} = this.props.match.params
    return (
      <Layout>
        <Section
          top
          title={`Deploy version v${versionNumber}`}
          description={`Select an environment to deploy version v${versionNumber}`}>
          <div>Deploy to environment</div>
          <br />
          <AutoForm
            ref="form"
            mutation="deployStaticWebsiteVersion"
            doc={{staticWebsiteId: this.props.staticWebsite._id, versionNumber}}
            only="environment"
            onSuccess={this.onSuccess}>
            <Field
              fieldName="environment"
              type={Select}
              options={this.props.staticWebsite.environments}
            />
          </AutoForm>
          <br />
          <Button
            onClick={() =>
              this.props.history.push(
                `/dashboard/static-website/${this.props.staticWebsite._id}/versions`
              )
            }>
            Cancel
          </Button>
          <Button onClick={() => this.refs.form.submit()} primary>
            Deploy
          </Button>
        </Section>
      </Layout>
    )
  }
}
