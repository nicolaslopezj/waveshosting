import {Model} from '@orion-js/app'

const InstancesHealth = new Model({
  name: 'EnvironmentInstancesHealth',
  schema: {
    noData: {type: Number},
    unknown: {type: Number},
    pending: {type: Number},
    ok: {type: Number},
    info: {type: Number},
    warning: {type: Number},
    degraded: {type: Number},
    severe: {type: Number}
  }
})

const ApplicationMetricsStatusCodes = new Model({
  name: 'EnvironmentApplicationMetricsStatusCodes',
  schema: {
    status2xx: {type: Number},
    status3xx: {type: Number},
    status4xx: {type: Number},
    status5xx: {type: Number}
  }
})

const ApplicationMetricsLatency = new Model({
  name: 'EnvironmentApplicationMetricsLatency',
  schema: {
    p999: {type: Number},
    p99: {type: Number},
    p95: {type: Number},
    p90: {type: Number},
    p85: {type: Number},
    p75: {type: Number},
    p50: {type: Number},
    p10: {type: Number}
  }
})

const ApplicationMetrics = new Model({
  name: 'EnvironmentApplicationMetrics',
  schema: {
    duration: {type: Number},
    requestCount: {type: Number},
    statusCodes: {type: ApplicationMetricsStatusCodes},
    latency: {type: ApplicationMetricsLatency}
  }
})

export default new Model({
  name: 'EnvironmentHealth',
  schema: {
    healthStatus: {
      type: String
    },
    status: {
      type: String
    },
    color: {
      type: String
    },
    causes: {
      type: [String]
    },
    refreshedAt: {
      type: Date
    },
    instancesHealth: {
      type: InstancesHealth
    },
    applicationMetrics: {
      type: ApplicationMetrics
    }
  }
})
