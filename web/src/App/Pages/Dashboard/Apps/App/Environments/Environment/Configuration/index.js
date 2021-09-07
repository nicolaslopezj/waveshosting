import React from 'react'
import styles from './styles.css'
import DNS from './DNS'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import EnvironmentVariables from './EnvironmentVariables'
import Rebuild from './Rebuild'
import Terminate from './Terminate'
import Restart from './Restart'
import PlatformVersion from './PlatformVersion'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withMessage
@withGraphQL(gql`
  query getEnvironmentConfig($appId: ID, $environmentName: String) {
    environment(appId: $appId, environmentName: $environmentName) {
      name
      cleanName
      appId
      ...environmentConfigDNS
      ...environmentConfigEnvironmentVariables
      ...environmentPlatformVersion
    }
  }
  ${DNS.fragment}
  ${PlatformVersion.fragment}
  ${EnvironmentVariables.fragment}
`)
export default class Configuration extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    environment: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    const {environment /*, showMessage */} = this.props
    return (
      <div className={styles.container}>
        <DNS environment={environment} />
        <EnvironmentVariables environment={environment} />
        {/* <PlatformVersion environment={environment} showMessage={showMessage} /> */}
        <Restart {...this.props.match.params} />
        <Rebuild environment={environment} />
        <Terminate environment={environment} />
      </div>
    )
  }
}
