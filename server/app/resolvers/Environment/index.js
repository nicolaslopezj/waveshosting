import setScalingOptions from './setScalingOptions'
import setEnvironmentVariables from './setEnvironmentVariables'
import setInstanceType from './setInstanceType'
import createEnvironment from './createEnvironment'
import environmentMonitoringOverview from './environmentMonitoringOverview'
import rebuildEnvironment from './rebuildEnvironment'
import restartEnvironment from './restartEnvironment'
import environmentHealth from './environmentHealth'
import environmentInstances from './environmentInstances'
import activateLogStreaming from './activateLogStreaming'
import environmentLogStreams from './environmentLogStreams'
import environmentLogs from './environmentLogs'
import filteredEnvironmentLogs from './filteredEnvironmentLogs'
import terminateEnvironment from './terminateEnvironment'
import setEnvironmentDeploymentOptions from './setEnvironmentDeploymentOptions'

export default {
  setEnvironmentDeploymentOptions,
  environmentLogs,
  environmentLogStreams,
  activateLogStreaming,
  environmentInstances,
  environmentHealth,
  environmentMonitoringOverview,
  setInstanceType,
  setScalingOptions,
  setEnvironmentVariables,
  createEnvironment,
  rebuildEnvironment,
  restartEnvironment,
  filteredEnvironmentLogs,
  terminateEnvironment
}
