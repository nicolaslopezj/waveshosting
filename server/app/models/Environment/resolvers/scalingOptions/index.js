import {resolver} from '@orion-js/app'
import ScalingOptions from '../../ScalingOptions'
import parseScalingMetric from './parseScalingMetric'

export default resolver({
  returns: ScalingOptions,
  async resolve(environment, params, viewer) {
    const options = {
      hasLoadBalancer:
        (await environment.option({
          namespace: 'aws:elasticbeanstalk:environment',
          optionName: 'EnvironmentType'
        })) === 'LoadBalanced',
      minInstances: Number(
        await environment.option({
          namespace: 'aws:autoscaling:asg',
          resourceName: 'AWSEBAutoScalingGroup',
          optionName: 'MinSize'
        })
      ),
      maxInstances: Number(
        await environment.option({
          namespace: 'aws:autoscaling:asg',
          resourceName: 'AWSEBAutoScalingGroup',
          optionName: 'MaxSize'
        })
      ),
      certificateId:
        (await environment.option({
          namespace: 'aws:elbv2:listener:443',
          optionName: 'SSLCertificateArns'
        })) || null,
      stickinessEnabled:
        (await environment.option({
          namespace: 'aws:elasticbeanstalk:environment:process:default',
          optionName: 'StickinessEnabled',
          resourceName: 'AWSEBV2LoadBalancerTargetGroup'
        })) === 'true' || null,
      scalingCooldown: Number(
        await environment.option({
          namespace: 'aws:autoscaling:asg',
          resourceName: 'AWSEBAutoScalingGroup',
          optionName: 'Cooldown'
        })
      ),
      scalingMetric: parseScalingMetric(environment),
      lowerThreshold: Number(
        await environment.option({
          namespace: 'aws:autoscaling:trigger',
          resourceName: 'AWSEBCloudwatchAlarmLow',
          optionName: 'LowerThreshold'
        })
      ),
      upperThreshold: Number(
        await environment.option({
          namespace: 'aws:autoscaling:trigger',
          resourceName: 'AWSEBCloudwatchAlarmHigh',
          optionName: 'UpperThreshold'
        })
      ),
      healthyHttpCode: await environment.option({
        namespace: 'aws:elasticbeanstalk:environment:process:default',
        optionName: 'MatcherHTTPCode',
        resourceName: 'AWSEBV2LoadBalancerTargetGroup'
      }),
      healthCheckPath: await environment.option({
        namespace: 'aws:elasticbeanstalk:environment:process:default',
        optionName: 'HealthCheckPath',
        resourceName: 'AWSEBV2LoadBalancerTargetGroup'
      })
    }

    options.autoscalingEnabled = options.minInstances !== options.maxInstances
    return options.hasLoadBalancer ? options : null
  }
})
