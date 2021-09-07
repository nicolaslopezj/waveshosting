import {resolver, Model} from '@orion-js/app'

const ScalingMetricOptions = new Model({
  name: 'ScalingMetricOptions',
  schema: {
    unit: {
      type: String
    },
    description: {
      type: String
    }
  }
})

const map = {
  cpu: {
    unit: 'Percent',
    description: 'Scale your environment by the average CPU in each server'
  },
  latency: {
    unit: 'Seconds',
    description: 'Scale your environment by the average latency for every request'
  },
  requestCount: {
    unit: 'Count/Second',
    description: 'Scale your environment by the sum of the requests count per second on each server'
  }
}

export default resolver({
  params: {
    scalingMetric: {
      type: String,
      allowedValues: ['cpu', 'latency', 'requestCount']
    }
  },
  returns: ScalingMetricOptions,
  async resolve({scalingMetric}, viewer) {
    return map[scalingMetric]
  }
})
