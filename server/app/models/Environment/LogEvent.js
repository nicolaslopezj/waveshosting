import {Model} from '@orion-js/app'

export default new Model({
  name: 'EnvironmentLogEvent',
  schema: {
    timestamp: {
      type: Date
    },
    ingestionTime: {
      type: Date
    },
    message: {
      type: String
    },
    eventId: {
      type: 'ID'
    }
  }
})
