import {resolver} from '@orion-js/app'
import AWS from 'aws-sdk'

export default resolver({
  private: true,
  async resolve(environment, params, viewer) {
    const credential = await environment.credential()
    const staticWebsite = await environment.staticWebsite()
    const beanstalk = new AWS.S3({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region: staticWebsite.region
    })
    return beanstalk
  }
})
