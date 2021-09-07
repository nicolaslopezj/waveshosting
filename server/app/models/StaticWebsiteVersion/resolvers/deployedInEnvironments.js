import {resolver} from '@orion-js/app'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'
import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'

export default resolver({
  returns: [StaticWebsiteEnvironment],
  async resolve(version, params, viewer) {
    return await StaticWebsiteEnvironments.find({deployedVersionNumber: version.number}).toArray()
  }
})
