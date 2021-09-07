import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import Version from 'app/models/Version'
import init from 'app/models/Version/init'
import checkAppPermission from 'app/helpers/checkAppPermission'

const getNewVersionLabel = async function (app) {
  const appVersions = await app.versions()
  if (!appVersions.length) return 'v1'
  const lastVersion = appVersions[0]
  if (lastVersion.label.startsWith('v')) {
    const lastVersionNumber = lastVersion.label.replace('v', '')
    return 'v' + (Number(lastVersionNumber) + 1)
  } else {
    return 'v' + (appVersions.length + 1)
  }
}

export default resolver({
  params: {
    appId: {
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
  returns: Version,
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, archiveKey, description}, viewer) {
    const app = await Apps.findOne(appId)

    const beanstalk = await app.beanstalk()
    const params = {
      ApplicationName: appId,
      Process: false,
      VersionLabel: await getNewVersionLabel(app),
      Description: description,
      SourceBundle: {
        S3Bucket: await app.bucketName(),
        S3Key: archiveKey
      }
    }
    const {ApplicationVersion} = await beanstalk.createApplicationVersion(params).promise()

    const version = init(ApplicationVersion)

    return version
  }
})
