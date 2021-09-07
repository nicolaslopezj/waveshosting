import {Model} from '@orion-js/app'

export default new Model({
  name: 'EnvironmentLogStream',
  schema: {
    logStreamName: {
      type: String
    },
    creationTime: {
      type: Date
    },
    arn: {
      type: String
    },
    storedBytes: {
      type: Number
    }
  }
})
