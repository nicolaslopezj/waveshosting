import {resolver, Model, generateId} from '@orion-js/app'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import StaticWebsites from 'app/collections/StaticWebsites'

export default resolver({
  params: {
    staticWebsiteId: {
      type: 'ID'
    }
  },
  returns: new Model({
    name: 'StaticWebsiteUploadSpot',
    schema: {
      url: {
        type: String
      },
      fields: {
        type: 'blackbox'
      },
      key: {
        type: String
      }
    }
  }),
  checkPermission: checkStaticWebsitePermission,
  mutation: true,
  async resolve({staticWebsiteId}, viewer) {
    const staticWebsite = await StaticWebsites.findOne(staticWebsiteId)
    const credential = await staticWebsite.credential()
    const bucketName = staticWebsite.versionsBucketName

    const s3 = await credential.aws({service: 'S3'})

    const key = `waves-archives/${generateId()}.zip`

    const result = await new Promise((resolve, reject) => {
      s3.createPresignedPost(
        {
          Bucket: bucketName,
          Fields: {
            key
          }
        },
        function(error, data) {
          if (error) reject(error)
          else resolve(data)
        }
      )
    })

    return {
      ...result,
      key
    }
  }
})
