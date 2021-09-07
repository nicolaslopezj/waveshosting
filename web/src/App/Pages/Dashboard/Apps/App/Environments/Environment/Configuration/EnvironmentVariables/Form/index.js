import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import {Field} from 'simple-react-form'
import EnvironmentVariables from './EnvironmentVariables'
import Button from 'orionsoft-parts/lib/components/Button'

const fragment = gql`
  fragment updateEnvironmentVariables on Environment {
    name
    appId
    status
    environmentVariables {
      name
      value
    }
  }
`

@withMessage
@withGraphQL(gql`
  query getEnvironmentVars($appId: ID, $environmentName: String) {
    environment(appId: $appId, environmentName: $environmentName) {
      ...updateEnvironmentVariables
      app {
        _id
        platform {
          _id
          basicEnvironmentVariablesParams
        }
      }
    }
  }
  ${fragment}
`)
export default class Form extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    environment: PropTypes.object
  }

  state = {}

  render() {
    const {environment} = this.props
    const basic =
      environment &&
      environment.app &&
      environment.app.platform &&
      environment.app.platform.basicEnvironmentVariablesParams
    return (
      <div className={styles.container}>
        <AutoForm
          mutation="setEnvironmentVariables"
          ref="form"
          only="environmentVariables"
          fragment={fragment}
          doc={{
            environmentName: environment.name,
            appId: environment.appId,
            environmentVariables: environment.environmentVariables
          }}
          onSuccess={() =>
            this.props.showMessage('The environment variables where saved correctly')
          }>
          <Field
            fieldName="environmentVariables"
            type={EnvironmentVariables}
            basicEnvironmentVariables={basic}
          />
        </AutoForm>
        <br />
        <Button
          disabled={environment.status !== 'Ready'}
          primary
          onClick={() => this.refs.form.submit()}>
          Save
        </Button>
      </div>
    )
  }
}
