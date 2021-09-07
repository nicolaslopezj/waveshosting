import {resolver} from '@orion-js/app'
import AWS from 'aws-sdk'

export default resolver({
  private: true,
  async resolve(app, params, viewer) {
    const credential = await app.credential()
    const cloudwatch = new AWS.CloudWatch({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region: app.region
    })
    return cloudwatch
  }
})
