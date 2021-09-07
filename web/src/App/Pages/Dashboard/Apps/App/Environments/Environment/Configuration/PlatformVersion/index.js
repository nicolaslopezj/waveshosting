import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import Button from 'orionsoft-parts/lib/components/Button'

export default class PlatformVersion extends React.Component {
  static fragment = gql`
    fragment environmentPlatformVersion on Environment {
      name
      appId
      solutionStack
      status
      app {
        _id
        platform {
          _id
          platformVersions(appId: $appId)
          solutionStacks(appId: $appId)
        }
      }
    }
  `

  static propTypes = {
    showMessage: PropTypes.func,
    environment: PropTypes.object
  }

  render() {
    const {environment} = this.props
    return (
      <div className={styles.container}>
        <Section
          title="Platform version"
          description="This indicates the versión of the server platform">
          <div>
            Changing the platform version replaces your instances. Your application will be
            unavailable during the update. To keep at least one instance in service during the
            update, enable rolling updates.
          </div>
          <br />
          <AutoForm
            mutation="setEnvironmentVariables"
            ref="form"
            only="environmentVariables"
            fragment={PlatformVersion.fragment}
            doc={{
              environmentName: environment.name,
              appId: environment.appId,
              platformVersion: environment.platformVersion
            }}
            onSuccess={() =>
              this.props.showMessage('The environment configuration was saved correctly')
            }>
            <Field
              fieldName="platformVersion"
              type={Select}
              placeholder="Select a version"
              options={environment.app.platform.platformVersions.map(item => ({
                label: item,
                value: item
              }))}
            />
          </AutoForm>
          <br />
          <Button
            disabled={environment.status !== 'Ready'}
            primary
            onClick={() => this.refs.form.submit()}>
            Save
          </Button>
        </Section>
      </div>
    )
  }
}
