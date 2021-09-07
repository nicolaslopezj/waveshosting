import {Model} from '@orion-js/app'

export default new Model({
  name: 'EnvironmentScalingOptions',
  schema: {
    autoscalingEnabled: {
      type: Boolean,
      defaultValue: false
    },
    minInstances: {
      type: Number,
      min: 1,
      max: 5
    },
    maxInstances: {
      type: Number,
      min: 1,
      clean(maxInstances, {currentDoc}) {
        const {minInstances} = currentDoc
        if (!currentDoc.autoscalingEnabled) return minInstances
        if (!maxInstances) return minInstances
        if (maxInstances < minInstances) return minInstances
        return maxInstances
      }
    },
    certificateId: {
      type: String,
      optional: true
    },
    stickinessEnabled: {
      type: Boolean,
      optional: true
    },
    scalingCooldown: {
      type: Number,
      optional: true
    },
    scalingMetric: {
      type: String,
      allowedValues: ['cpu', 'latency', 'requestCount'],
      optional: true
    },
    lowerThreshold: {
      type: Number,
      optional: true
    },
    upperThreshold: {
      type: Number,
      optional: true
    },
    healthyHttpCode: {
      type: String,
      optional: true
    },
    healthCheckPath: {
      type: String,
      optional: true
    }
  }
})
