import {resolver, Model, generateId} from '@orion-js/app'
import AWS from 'aws-sdk'
import Apps from 'app/collections/Apps'
import checkAppPermission from 'app/helpers/checkAppPermission'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: new Model({
    name: 'UploadSpot',
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
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId}, viewer) {
    const app = await Apps.findOne(appId)
    const credential = await app.credential()
    const bucketName = await app.bucketName()

    const s3 = new AWS.S3({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region: app.region
    })

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
