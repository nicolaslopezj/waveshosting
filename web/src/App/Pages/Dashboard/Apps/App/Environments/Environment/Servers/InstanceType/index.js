import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import LoadingSection from 'App/components/LoadingSection'
import AutoForm from 'App/components/AutoForm'
import PropTypes from 'prop-types'
import {Field} from 'simple-react-form'
import Button from 'orionsoft-parts/lib/components/Button'
import Instance from 'App/components/fields/Instance'

const fragment = gql`
  fragment editInstanceType on Environment {
    name
    appId
    status
    instanceType
  }
`

@withGraphQL(
  gql`
    query getInstanceType($appId: ID, $environmentName: String) {
      environment(appId: $appId, environmentName: $environmentName) {
        ...editInstanceType
      }
    }
    ${fragment}
  `,
  {loading: <LoadingSection top />}
)
export default class InstanceType extends React.Component {
  static propTypes = {
    environment: PropTypes.object,
    instanceTypes: PropTypes.array
  }

  render() {
    const {environment} = this.props
    return (
      <div className={styles.container}>
        <Section top title="Instance type" description="Select the type of the instance">
          <div>
            <AutoForm
              mutation="setInstanceType"
              ref="form"
              fragment={fragment}
              doc={{
                environmentName: environment.name,
                appId: environment.appId,
                instanceType: environment.instanceType
              }}>
              <div className="label">Instance type</div>
              <Field
                fieldName="instanceType"
                placeholder="Select the instance"
                type={Instance}
                appId={environment.appId}
                environmentName={environment.name}
              />
            </AutoForm>
            <br />
            <Button primary onClick={() => this.refs.form.submit()}>
              Save
            </Button>
          </div>
        </Section>
      </div>
    )
  }
}
