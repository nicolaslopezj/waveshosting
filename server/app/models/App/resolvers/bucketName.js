import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  private: true,
  async resolve(app, params, viewer) {
    const beanstalk = await app.beanstalk()
    const {S3Bucket} = await beanstalk.createStorageLocation().promise()
    return S3Bucket
  }
})
