import React from 'react'
import Layout from '../Layout'
import Section from 'App/components/Section'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Button from 'orionsoft-parts/lib/components/Button'

@withRouter
export default class Create extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
  }

  renderContent() {
    const {staticWebsiteId} = this.props.match.params
    return (
      <Section
        title="Create environment"
        description="Create a new environment for your static website"
        top>
        <AutoForm
          mutation="createStaticWebsiteEnvironment"
          ref="form"
          doc={{staticWebsiteId}}
          onSuccess={environment =>
            this.props.history.push(
              `/dashboard/static-websites/${staticWebsiteId}/${environment.name}`
            )
          }>
          <div className="label">Name</div>
          <Field fieldName="name" type={Text} placeholder="Something like production or beta" />
          <div className="description">
            A name for this environment. Lowercase and only letters and {'"'}-{'"'}. Names must be
            unique in this static webiste
          </div>
        </AutoForm>
        <br />
        <Button to="/dashboard/static-websites" style={{marginRight: 10}}>
          Cancel
        </Button>
        <Button onClick={() => this.refs.form.submit()} primary>
          Create
        </Button>
      </Section>
    )
  }

  render() {
    return <Layout title="Create a new environment">{this.renderContent()}</Layout>
  }
}
