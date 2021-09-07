import {resolver} from '@orion-js/app'
import Environment from 'app/models/Environment'
import ScalingOptions from 'app/models/Environment/ScalingOptions'
import Apps from 'app/collections/Apps'
import checkAppPermission from 'app/helpers/checkAppPermission'
import getAutoScaling from './getAutoScaling'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: String
    },
    useLoadBalancer: {
      type: Boolean
    },
    options: {
      type: ScalingOptions,
      optional: true
    }
  },
  returns: Environment,
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve(params, viewer) {
    const {appId, environmentName, useLoadBalancer, options} = params
    const app = await Apps.findOne(appId)

    const settings = [
      {
        Namespace: 'aws:elasticbeanstalk:environment',
        OptionName: 'EnvironmentType',
        Value: useLoadBalancer ? 'LoadBalanced' : 'SingleInstance'
      },
      {
        Namespace: 'aws:elasticbeanstalk:environment:process:default',
        OptionName: 'StickinessEnabled',
        ResourceName: 'AWSEBV2LoadBalancerTargetGroup',
        Value: useLoadBalancer ? `${options.stickinessEnabled || 'false'}` : 'false'
      },
      {
        Namespace: 'aws:elasticbeanstalk:environment:process:default',
        OptionName: 'MatcherHTTPCode',
        ResourceName: 'AWSEBV2LoadBalancerTargetGroup',
        Value: options.healthyHttpCode || '200'
      },
      {
        Namespace: 'aws:elasticbeanstalk:environment:process:default',
        OptionName: 'HealthCheckPath',
        ResourceName: 'AWSEBV2LoadBalancerTargetGroup',
        Value: options.healthCheckPath ? `${options.healthCheckPath}` : '/'
      },
      {
        Namespace: 'aws:autoscaling:asg',
        OptionName: 'MinSize',
        ResourceName: 'AWSEBAutoScalingGroup',
        Value: useLoadBalancer ? `${options.minInstances}` : '1'
      },
      {
        Namespace: 'aws:autoscaling:asg',
        OptionName: 'MaxSize',
        ResourceName: 'AWSEBAutoScalingGroup',
        Value: useLoadBalancer ? `${options.maxInstances}` : '1'
      },
      {
        Namespace: 'aws:autoscaling:asg',
        OptionName: 'Cooldown',
        ResourceName: 'AWSEBAutoScalingGroup',
        Value: options.scalingCooldown ? `${options.scalingCooldown}` : '360'
      },
      {
        Namespace: 'aws:elbv2:listener:443',
        OptionName: 'SSLCertificateArns',
        Value: options.certificateId || null
      },
      {
        Namespace: 'aws:elbv2:listener:443',
        OptionName: 'Rules',
        Value: ''
      },
      {
        Namespace: 'aws:elbv2:listener:443',
        OptionName: 'ListenerEnabled',
        Value: options.certificateId ? 'true' : 'false'
      },
      {
        Namespace: 'aws:elbv2:listener:443',
        OptionName: 'DefaultProcess',
        Value: 'default'
      },
      {
        Namespace: 'aws:elbv2:listener:443',
        OptionName: 'SSLPolicy',
        Value: 'ELBSecurityPolicy-2016-08'
      },
      {
        Namespace: 'aws:elbv2:listener:443',
        OptionName: 'Protocol',
        Value: 'HTTPS'
      },
      ...getAutoScaling(options)
    ]

    const env = await app.updateEnvironmentSettings({environmentName, settings})

    return env
  }
})
