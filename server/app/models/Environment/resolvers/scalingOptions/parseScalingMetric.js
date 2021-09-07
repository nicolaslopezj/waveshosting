export default async function(environment) {
  const value = await environment.option({
    namespace: 'aws:autoscaling:trigger',
    resourceName: 'AWSEBCloudwatchAlarmLow',
    optionName: 'MeasureName'
  })

  const map = {
    CPUUtilization: 'cpu',
    NetworkIn: null,
    NetworkOut: null,
    DiskWriteOps: null,
    DiskReadBytes: null,
    DiskReadOps: null,
    DiskWriteBytes: null,
    Latency: 'latency',
    RequestCount: 'requestCount',
    HealthyHostCount: null,
    UnhealthyHostCount: null
  }

  return map[value]
}
