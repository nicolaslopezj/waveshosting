import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import LoadingSection from 'App/components/LoadingSection'

const fragment = gql`
  fragment staticWebsiteEnvironmentEnabled on StaticWebsiteEnvironment {
    _id
    name
    enabled
    status
    staticWebsiteId
  }
`

@withGraphQL(
  gql`
    query getStaticWebsiteEnvironment($environmentName: ID, $staticWebsiteId: ID) {
      environment: staticWebsiteEnvironment(
        environmentName: $environmentName
        staticWebsiteId: $staticWebsiteId
      ) {
        ...staticWebsiteEnvironmentEnabled
      }
    }
    ${fragment}
  `,
  {loading: <LoadingSection />}
)
export default class Enable extends React.Component {
  static propTypes = {
    environment: PropTypes.object
  }

  render() {
    const {environment} = this.props
    if (environment.status === 'Terminated') return null

    const params = {
      staticWebsiteId: environment.staticWebsiteId,
      environmentName: environment.name,
      enabled: !environment.enabled
    }
    const willEnable = !environment.enabled
    return (
      <div className={styles.container}>
        <Section
          title={`${willEnable ? 'Enable' : 'Disable'} environment`}
          description="Disable the environment to prevent anyone to access the website. You must disable the environment to terminate it">
          <div>
            {willEnable ? 'Enable' : 'Disable'} the environment <b>{environment.name}</b>
          </div>
          <br />
          <MutationButton
            fragment={fragment}
            mutation="setStaticWebsiteEnvironmentEnabled"
            label={`${willEnable ? 'Enable' : 'Disable'} environment`}
            message={`This will ${
              willEnable ? 'allow the' : 'prevent anyone to'
            } access the website`}
            title={`${willEnable ? 'Enable' : 'Disable'} environment`}
            confirmText={willEnable ? 'Enable' : 'Disable'}
            params={params}
          />
        </Section>
      </div>
    )
  }
}
