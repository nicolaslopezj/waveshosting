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
    const result = await beanstalk.listAvailableSolutionStacks().promise()
    return result.SolutionStacks.filter(name =>
      name.includes(`running ${platform.beanstalkSolutionStackName} `)
    )
  }
})
