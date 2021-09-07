import {Model} from '@orion-js/app'

const LogGroup = new Model({
  name: 'EnvironmentLogGroup',
  schema: {
    name: {
      type: String
    },
    logGroupName: {
      type: String
    },
    creationTime: {
      type: Date
    },
    retentionInDays: {
      type: Number
    },
    metricFilterCount: {
      type: Number
    },
    arn: {
      type: String
    },
    storedBytes: {
      type: Number
    }
  }
})

export default new Model({
  name: 'EnvironmentLogsOptions',
  schema: {
    active: {
      type: Boolean
    },
    retention: {
      type: Number,
      min: 1
    },
    logGroups: {
      type: [LogGroup]
    }
  }
})
