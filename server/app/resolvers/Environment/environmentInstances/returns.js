import {Model} from '@orion-js/app'

const ApplicationMetricsStatusCodes = new Model({
  name: 'EnvironmentInstanceMetricsStatusCodes',
  schema: {
    status2xx: {type: Number},
    status3xx: {type: Number},
    status4xx: {type: Number},
    status5xx: {type: Number}
  }
})

const ApplicationMetricsLatency = new Model({
  name: 'EnvironmentInstanceMetricsLatency',
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
  name: 'EnvironmentInstanceMetrics',
  schema: {
    duration: {type: Number},
    requestCount: {type: Number},
    statusCodes: {type: ApplicationMetricsStatusCodes},
    latency: {type: ApplicationMetricsLatency}
  }
})

const Deployment = new Model({
  name: 'EnvironmentInstanceDeployment',
  schema: {
    versionLabel: {type: String},
    deploymentId: {type: Number},
    status: {type: String},
    deploymentTime: {type: Date}
  }
})

const SystemCPU = new Model({
  name: 'EnvironmentInstanceSystemCPUUtilization',
  schema: {
    user: {type: Number},
    system: {type: Number},
    idle: {type: Number}
  }
})

const System = new Model({
  name: 'EnvironmentInstanceSystemMetrics',
  schema: {
    cpuUtilization: {type: SystemCPU}
  }
})

export default new Model({
  name: 'EnvironmentInstance',
  schema: {
    instanceId: {
      type: String
    },
    availabilityZone: {
      type: String
    },
    instanceType: {
      type: String
    },
    deployment: {
      type: Deployment
    },
    launchedAt: {
      type: Date
    },
    healthStatus: {
      type: String
    },
    color: {
      type: String
    },
    causes: {
      type: [String]
    },
    applicationMetrics: {
      type: ApplicationMetrics
    },
    system: {
      type: System
    }
  }
})
