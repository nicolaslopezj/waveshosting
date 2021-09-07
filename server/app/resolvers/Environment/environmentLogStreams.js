import {resolver} from '@orion-js/app'
import LogStream from 'app/models/Environment/LogStream'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: String
    },
    logGroupName: {
      type: String
    }
  },
  returns: [LogStream],
  async resolve({appId, environmentName, logGroupName}, viewer) {
    logGroupName = decodeURIComponent(logGroupName)
    const app = await Apps.findOne(appId)
    const cloudwatchlogs = await app.cloudwatchlogs()
    const {logStreams} = await cloudwatchlogs.describeLogStreams({logGroupName}).promise()

    return logStreams.map(stream => {
      return {
        ...stream
      }
    })
  }
})
