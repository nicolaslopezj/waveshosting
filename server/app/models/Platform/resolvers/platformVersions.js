import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: [String],
  async resolve(platform, {appId}, viewer) {
    const app = await Apps.findOne(appId)
    const beanstalk = await app.beanstalk()
    const params = {
      Filters: [
        {
          Type: 'PlatformStatus',
          Operator: '=',
          Values: ['Ready']
        },
        {
          Type: 'PlatformName',
          Operator: 'begins_with',
          Values: [platform.beanstalkSolutionStackName]
        }
      ]
    }
    const result = await beanstalk.listPlatformVersions(params).promise()
    return result.PlatformSummaryList.map(item =>
      item.PlatformArn.replace('arn:aws:elasticbeanstalk:us-east-1::platform/', '')
    )
  }
})
