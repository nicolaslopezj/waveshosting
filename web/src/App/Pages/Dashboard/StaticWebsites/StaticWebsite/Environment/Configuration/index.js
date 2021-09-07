import React from 'react'
import styles from './styles.css'
import Enable from './Enable'
import Terminate from './Terminate'
import DNS from './DNS'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import LoadingSection from 'App/components/LoadingSection'

@withGraphQL(
  gql`
    query getStaticWebsiteEnvironment($environmentName: ID, $staticWebsiteId: ID) {
      environment: staticWebsiteEnvironment(
        environmentName: $environmentName
        staticWebsiteId: $staticWebsiteId
      ) {
        _id
        staticWebsiteId
        name
        cname
      }
    }
  `,
  {
    loading: [
      <LoadingSection top key="1" />,
      <LoadingSection key="2" />,
      <LoadingSection key="3" />
    ]
  }
)
export default class Configuration extends React.Component {
  static propTypes = {
    environment: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    const {environment, match} = this.props
    return (
      <div className={styles.container}>
        <DNS environment={environment} />
        <Enable {...match.params} />
        <Terminate environment={environment} />
      </div>
    )
  }
}
