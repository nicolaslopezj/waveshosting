import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import AutoForm from 'App/components/AutoForm'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Button from 'orionsoft-parts/lib/components/Button'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import {Field} from 'simple-react-form'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Content from 'App/components/Content'
import LoadingSection from 'App/components/LoadingSection'
import {Link} from 'react-router-dom'
import HelpIcon from 'react-icons/lib/md/help'

@withRouter
@withGraphQL(
  gql`
    query getCreateAppOptions {
      canCreateAnApp
      credentials {
        value: _id
        label: name
      }
      regions {
        value: code
        label: name
      }
      platforms {
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
    regions: PropTypes.array,
    platforms: PropTypes.array,
    loading: PropTypes.bool
  }

  renderLoading() {
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/dashboard': 'My Apps'}}>Create a new App</Breadcrumbs>
        <div className="divider" />
        <Content>
          <LoadingSection top />
        </Content>
      </div>
    )
  }

  render() {
    if (this.props.loading) return this.renderLoading()
    if (!this.props.canCreateAnApp) {
      this.props.history.replace('/dashboard/subscribe')
    }
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/dashboard': 'My Apps'}}>Create a new App</Breadcrumbs>
        <div className="divider" />
        <Content>
          <Section
            top
            title="Configuration"
            description="Application basic configuration, you can't change this later">
            <a
              className={styles.help}
              href="https://support.waveshosting.com/getting-started/how-to-create-an-app"
              target="_blank"
              rel="noopener noreferrer">
              <HelpIcon size={18} /> How to create an app
            </a>
            <AutoForm
              mutation="createApp"
              ref="form"
              onSuccess={app => this.props.history.push(`/dashboard/apps/${app._id}`)}>
              <div className="label">Name</div>
              <Field fieldName="_id" type={Text} />
              <div className="description">
                A name for this app. Lowercase and only letters and {'"'}-{'"'}. Names must be
                unique
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

              <div className="label">Region</div>
              <Field
                fieldName="region"
                type={Select}
                options={this.props.regions}
                placeholder="Choose the region"
              />
              <div className="description">Choose the AWS region for your app</div>

              <div className="label">Platform</div>
              <Field
                fieldName="platformId"
                type={Select}
                options={this.props.platforms}
                placeholder="Choose a platform"
              />
              <div className="description">Choose which platform is your app</div>
            </AutoForm>
            <br />
            <Button to="/dashboard/apps" style={{marginRight: 10}}>
              Cancel
            </Button>
            <Button onClick={() => this.refs.form.submit()} primary>
              Save
            </Button>
          </Section>
        </Content>
      </div>
    )
  }
}
