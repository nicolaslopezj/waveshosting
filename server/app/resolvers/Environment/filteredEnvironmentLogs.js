import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import PaginatedLogEvent from 'app/models/Environment/PaginatedLogEvent'
import hash from 'object-hash'

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
    },
    logStreamName: {
      type: String
    },
    filter: {
      type: String,
      optional: true
    },
    endDate: {
      type: Date,
      optional: true
    },
    startDate: {
      type: Date,
      optional: true
    },
    nextToken: {
      type: String,
      optional: true
    }
  },
  returns: PaginatedLogEvent,
  async resolve(
    {appId, environmentName, logGroupName, logStreamName, filter, startDate, endDate, nextToken},
    viewer
  ) {
    logGroupName = decodeURIComponent(logGroupName)
    logStreamName = decodeURIComponent(logStreamName)
    const app = await Apps.findOne(appId)
    const cloudwatchlogs = await app.cloudwatchlogs()
    const result = await cloudwatchlogs
      .filterLogEvents({
        logGroupName,
        logStreamNames: [logStreamName],
        nextToken,
        limit: 20,
        filterPattern: filter,
        startTime: startDate ? startDate.getTime() : undefined
      })
      .promise()

    return {
      nextToken: result.nextToken,
      items: result.events.map(event => {
        return {
          timestamp: new Date(event.timestamp),
          ingestionTime: new Date(event.timestamp),
          message: event.message,
          eventId: hash(event)
        }
      })
    }
  }
})
