import {resolver} from '@orion-js/app'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import StaticWebsiteVersions from 'app/collections/StaticWebsiteVersions'
import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'
import StaticWebsites from 'app/collections/StaticWebsites'
import uploadContents from './uploadContents'
import createInvalidation from './createInvalidation'
import deleteOldFiles from './deleteOldFiles'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'

export default resolver({
  params: {
    environment: {
      type: 'ID'
    },
    staticWebsiteId: {
      type: 'ID'
    },
    versionNumber: {
      type: Number
    }
  },
  returns: StaticWebsiteEnvironment,
  checkPermission: checkStaticWebsitePermission,
  mutation: true,
  async resolve({environment: environmentName, staticWebsiteId, versionNumber}, viewer) {
    const staticWebsite = await StaticWebsites.findOne(staticWebsiteId)
    const environment = await StaticWebsiteEnvironments.findOne({
      name: environmentName,
      staticWebsiteId
    })
    const version = await StaticWebsiteVersions.findOne({staticWebsiteId, number: versionNumber})
    const credential = await staticWebsite.credential()
    const s3 = await credential.aws({service: 'S3'})

    const archive = await s3
      .getObject({
        Bucket: staticWebsite.versionsBucketName,
        Key: version.archiveKey
      })
      .promise()

    await deleteOldFiles({s3, bucketName: environment.bucketName})

    const fileNames = await uploadContents({archive, s3, bucketName: environment.bucketName})

    await createInvalidation({fileNames, credential, environment, version})

    await environment.update({$set: {deployedVersionNumber: versionNumber}})

    return version
  }
})
