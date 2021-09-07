import {resolver, generateId} from '@orion-js/app'
import StaticWebsite from 'app/models/StaticWebsite'
import StaticWebsites from 'app/collections/StaticWebsites'
import Credentials from 'app/collections/Credentials'

export default resolver({
  params: {
    _id: {
      type: 'ID',
      label: 'Name',
      description: 'A name for this static website'
    },
    credentialId: {
      type: String,
      label: 'Credential',
      description: 'Which credential you want to use in this app',
      async custom(credentialId, info, viewer) {
        const count = await Credentials.find({userId: viewer.userId, _id: credentialId}).count()
        if (!count) return 'notFound'
      }
    },
    platformId: StaticWebsite.schema.platformId
  },
  returns: StaticWebsite,
  mutation: true,
  async resolve({_id, credentialId, platformId}, viewer) {
    const versionsBucketName = `${_id}-${generateId()}-versions`.toLowerCase()

    const item = {
      _id,
      region: 'us-east-1',
      credentialId,
      platformId,
      userId: viewer.userId,
      createdAt: new Date(),
      versionsBucketName
    }

    StaticWebsite.validate(item)

    const credential = await Credentials.findOne(credentialId)
    const s3 = await credential.aws({service: 'S3'})
    await s3.createBucket({Bucket: versionsBucketName}).promise()

    await StaticWebsites.insert(item)

    return item
  }
})
