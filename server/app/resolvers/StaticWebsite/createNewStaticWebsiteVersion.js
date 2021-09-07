import {resolver} from '@orion-js/app'
import StaticWebsiteVersion from 'app/models/StaticWebsiteVersion'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import StaticWebsiteVersions from 'app/collections/StaticWebsiteVersions'

export default resolver({
  params: {
    staticWebsiteId: {
      type: 'ID'
    },
    archiveKey: {
      type: String
    },
    description: {
      type: String,
      optional: true
    }
  },
  returns: StaticWebsiteVersion,
  checkPermission: checkStaticWebsitePermission,
  mutation: true,
  async resolve({staticWebsiteId, archiveKey, description}, viewer) {
    const last = (await StaticWebsiteVersions.findOne({staticWebsiteId}, {sort: {number: -1}})) || {
      number: 0
    }
    const item = {
      number: last.number + 1,
      staticWebsiteId,
      archiveKey,
      description,
      createdAt: new Date()
    }

    item._id = await StaticWebsiteVersions.insert(item)

    return item
  }
})
