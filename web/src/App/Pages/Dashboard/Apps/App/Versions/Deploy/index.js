import React from 'react'
import styles from './styles.css'
import Header from '../../Header'
import Content from 'App/components/Content'
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

@withMessage
@withRouter
@withGraphQL(gql`
  query app($appId: ID) {
    app(appId: $appId) {
      _id
      environments {
        value: name
        label: cleanName
      }
    }
  }
`)
export default class Deploy extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    showMessage: PropTypes.func,
    app: PropTypes.object,
    match: PropTypes.object
  }

  @autobind
  onSuccess() {
    this.props.showMessage('Deploy in progress')
    this.props.history.push(`/dashboard/apps/${this.props.app._id}`)
  }

  render() {
    if (!this.props.app) return null

    const {versionLabel} = this.props.match.params
    return (
      <div className={styles.container}>
        <Header />
        <Content>
          <Section
            top
            title={`Deploy version ${versionLabel}`}
            description={`Select an environment to deploy version ${versionLabel}`}>
            <div>Deploy to environment</div>
            <br />
            <AutoForm
              ref="form"
              mutation="deployVersion"
              doc={{appId: this.props.app._id, version: versionLabel}}
              only="environment"
              onSuccess={this.onSuccess}>
              <Field fieldName="environment" type={Select} options={this.props.app.environments} />
            </AutoForm>
            <br />
            <Button
              onClick={() =>
                this.props.history.push(`/dashboard/apps/${this.props.app._id}/versions`)
              }>
              Cancel
            </Button>
            <Button onClick={() => this.refs.form.submit()} primary>
              Deploy
            </Button>
          </Section>
        </Content>
      </div>
    )
  }
}
