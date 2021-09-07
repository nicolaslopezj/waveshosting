import {resolver} from '@orion-js/app'
import StaticWebsiteVersion from 'app/models/StaticWebsiteVersion'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import StaticWebsiteVersions from 'app/collections/StaticWebsiteVersions'

export default resolver({
  params: {
    staticWebsiteId: {
      type: 'ID'
    },
    versionNumber: {
      type: Number
    },
    description: {
      type: String,
      optional: true
    }
  },
  returns: StaticWebsiteVersion,
  checkPermission: checkStaticWebsitePermission,
  mutation: true,
  async resolve({staticWebsiteId, versionNumber, description}, viewer) {
    const version = await StaticWebsiteVersions.findOne({staticWebsiteId, number: versionNumber})

    await version.update({$set: {description}})

    return version
  }
})
