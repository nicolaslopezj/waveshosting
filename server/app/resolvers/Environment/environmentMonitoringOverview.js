import {resolver, Model} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import {DateTime, Duration} from 'luxon'
import checkAppPermission from 'app/helpers/checkAppPermission'

const MonitoringOverviewStat = new Model({
  name: 'MonitoringOverviewStat',
  schema: {
    _id: {
      type: 'ID'
    },
    label: {
      type: String
    },
    unit: {
      type: String
    },
    timestamp: {
      type: String
    },
    percentage: {
      type: Number
    },
    text: {
      type: String
    },
    seconds: {
      type: Number
    },
    count: {
      type: Number
    },
    bytes: {
      type: Number
    }
  }
})

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: 'ID'
    },
    period: {
      type: String,
      allowedValues: ['5-minutes', '15-minutes', '30-minutes', '1-hours', '6-hours', '1-day'],
      defaultValue: '5-minutes'
    }
  },
  cache: 5000,
  returns: [MonitoringOverviewStat],
  requireUserId: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, environmentName, period}, viewer) {
    const app = await Apps.findOne(appId)
    const cloudwatch = await app.cloudwatch()
    const environment = await app.environment({environmentName})
    const {autoScalingGroup, loadBalancer} = await environment.resources()

    const queries = []

    const [amount, periodName] = period.split('-')

    const periodSeconds = Duration.fromObject({[periodName]: Number(amount)}).as('seconds')

    if (loadBalancer) {
      const parts = loadBalancer.split('/app')
      const id = 'app' + parts[1]
      queries.push({
        Id: 'healthyHostCount',
        MetricStat: {
          Metric: {
            Dimensions: [
              {
                Name: 'LoadBalancer',
                Value: id
              }
            ],
            MetricName: 'HealthyHostCount',
            Namespace: 'AWS/ApplicationELB'
          },
          Period: periodSeconds,
          Stat: 'Average'
        }
      })

      queries.push({
        Id: 'targetResponseTime',
        MetricStat: {
          Metric: {
            Dimensions: [
              {
                Name: 'LoadBalancer',
                Value: id
              }
            ],
            MetricName: 'TargetResponseTime',
            Namespace: 'AWS/ApplicationELB'
          },
          Period: periodSeconds,
          Stat: 'Average'
        }
      })

      queries.push({
        Id: 'sumRequests',
        MetricStat: {
          Metric: {
            Dimensions: [
              {
                Name: 'LoadBalancer',
                Value: id
              }
            ],
            MetricName: 'RequestCount',
            Namespace: 'AWS/ApplicationELB'
          },
          Period: periodSeconds,
          Stat: 'Sum'
        }
      })
    }

    if (autoScalingGroup) {
      queries.push({
        Id: 'cpuUtilization',
        MetricStat: {
          Metric: {
            Dimensions: [
              {
                Name: 'AutoScalingGroupName',
                Value: autoScalingGroup.split('/').pop()
              }
            ],
            MetricName: 'CPUUtilization',
            Namespace: 'AWS/EC2'
          },
          Period: periodSeconds,
          Stat: 'Average',
          Unit: 'Percent'
        }
      })

      queries.push({
        Id: 'networkIn',
        MetricStat: {
          Metric: {
            Dimensions: [
              {
                Name: 'AutoScalingGroupName',
                Value: autoScalingGroup.split('/').pop()
              }
            ],
            MetricName: 'NetworkIn',
            Namespace: 'AWS/EC2'
          },
          Period: periodSeconds,
          Stat: 'Maximum'
        }
      })

      queries.push({
        Id: 'networkOut',
        MetricStat: {
          Metric: {
            Dimensions: [
              {
                Name: 'AutoScalingGroupName',
                Value: autoScalingGroup.split('/').pop()
              }
            ],
            MetricName: 'NetworkOut',
            Namespace: 'AWS/EC2'
          },
          Period: periodSeconds,
          Stat: 'Maximum'
        }
      })
    }

    if (loadBalancer) {
    }

    const params = {
      StartTime: DateTime.local()
        .minus({[periodName]: amount * 2})
        .toJSDate(),
      EndTime: DateTime.local()
        .plus({[periodName]: amount * 1})
        .toJSDate(),
      MetricDataQueries: queries,
      ScanBy: 'TimestampDescending'
    }

    const {MetricDataResults} = await cloudwatch.getMetricData(params).promise()

    const labels = {
      cpuUtilization: 'CPU utilization',
      healthyHostCount: 'Healthy host count',
      targetResponseTime: 'Target response time',
      sumRequests: 'Requests',
      networkIn: 'Network in',
      networkOut: 'Network out'
    }

    const units = {
      cpuUtilization: 'percentage',
      healthyHostCount: 'text',
      targetResponseTime: 'seconds',
      sumRequests: 'count',
      networkIn: 'bytes',
      networkOut: 'bytes'
    }

    const stats = MetricDataResults.map(result => {
      return {
        _id: environmentName + period + result.Id,
        label: labels[result.Id],
        unit: units[result.Id],
        [units[result.Id]]: result.Values[0]
      }
    })

    return stats
  }
})
