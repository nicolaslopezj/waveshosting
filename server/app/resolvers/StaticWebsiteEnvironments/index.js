import createStaticWebsiteEnvironment from './createStaticWebsiteEnvironment'
import staticWebsiteEnvironment from './staticWebsiteEnvironment'
// import rebuildStaticWebsiteEnvironment from './rebuildStaticWebsiteEnvironment'
import terminateStaticWebsiteEnvironment from './terminateStaticWebsiteEnvironment'
import deployStaticWebsiteVersion from './deployStaticWebsiteVersion'
import setStaticWebsiteEnvironmentCertificate from './setStaticWebsiteEnvironmentCertificate'
import setStaticWebsiteEnvironmentDomains from './setStaticWebsiteEnvironmentDomains'
import setStaticWebsiteEnvironmentEnabled from './setStaticWebsiteEnvironmentEnabled'

export default {
  setStaticWebsiteEnvironmentCertificate,
  deployStaticWebsiteVersion,
  terminateStaticWebsiteEnvironment,
  // rebuildStaticWebsiteEnvironment,
  staticWebsiteEnvironment,
  createStaticWebsiteEnvironment,
  setStaticWebsiteEnvironmentDomains,
  setStaticWebsiteEnvironmentEnabled
}
