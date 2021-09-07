import {resolver} from '@orion-js/app'
import Version from 'app/models/Version'
import init from 'app/models/Version/init'
import Apps from 'app/collections/Apps'
import checkAppPermission from 'app/helpers/checkAppPermission'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    versionLabel: {
      type: String
    },
    description: {
      type: String,
      optional: true
    }
  },
  returns: Version,
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, versionLabel, description}, viewer) {
    const app = await Apps.findOne(appId)

    const beanstalk = await app.beanstalk()

    const result = await beanstalk
      .updateApplicationVersion({
        ApplicationName: appId,
        VersionLabel: versionLabel,
        Description: description || ''
      })
      .promise()

    return init(result.ApplicationVersion)
  }
})
