const map = {
  cpu: {
    unit: 'Percent',
    name: 'CPUUtilization',
    statistic: 'Average'
  },
  latency: {
    unit: 'Seconds',
    name: 'Latency',
    statistic: 'Average'
  },
  requestCount: {
    unit: 'Count/Second',
    name: 'RequestCount',
    statistic: 'Sum'
  }
}

export default function(options) {
  const {minInstances, maxInstances, lowerThreshold, upperThreshold, scalingMetric} = options
  const useAutoScaling = scalingMetric && minInstances !== maxInstances
  const info = map[scalingMetric] || map.cpu
  return [
    {
      Namespace: 'aws:autoscaling:trigger',
      OptionName: 'LowerThreshold',
      ResourceName: 'AWSEBCloudwatchAlarmLow',
      Value: useAutoScaling ? `${lowerThreshold}` : '30'
    },
    {
      Namespace: 'aws:autoscaling:trigger',
      OptionName: 'UpperThreshold',
      ResourceName: 'AWSEBCloudwatchAlarmHigh',
      Value: useAutoScaling ? `${upperThreshold}` : '60'
    },
    {
      Namespace: 'aws:autoscaling:trigger',
      OptionName: 'MeasureName',
      ResourceName: 'AWSEBCloudwatchAlarmLow',
      Value: info.name
    },
    {
      Namespace: 'aws:autoscaling:trigger',
      OptionName: 'Statistic',
      ResourceName: 'AWSEBCloudwatchAlarmLow',
      Value: info.statistic
    },
    {
      Namespace: 'aws:autoscaling:trigger',
      OptionName: 'Unit',
      ResourceName: 'AWSEBCloudwatchAlarmLow',
      Value: info.unit
    }
  ]
}
