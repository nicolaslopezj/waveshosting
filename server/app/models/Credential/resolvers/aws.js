import {resolver} from '@orion-js/app'
import AWS from 'aws-sdk'

export default resolver({
  params: {
    service: {
      type: String,
      defaultValue: 'ElasticBeanstalk'
    },
    region: {
      type: String,
      optional: true
    }
  },
  private: true,
  async resolve(credential, {service, region}, viewer) {
    return new AWS[service]({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region
    })
  }
})
