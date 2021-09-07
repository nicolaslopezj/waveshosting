import {resolver} from '@orion-js/app'
import AWS from 'aws-sdk'

export default resolver({
  private: true,
  async resolve(environment, params, viewer) {
    const credential = await environment.credential()
    const beanstalk = new AWS.CloudFront({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey
    })
    return beanstalk
  }
})
