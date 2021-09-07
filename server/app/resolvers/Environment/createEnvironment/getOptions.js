import getInstanceProfile from './getInstanceProfile'
import getServiceRole from './getServiceRole'
import getSolutionStackName from './getSolutionStackName'

export default async function({app, environmentName, versionLabel, options, environmentVariables}) {
  const platform = await app.platform()

  const platformOptions = await platform.getOptions(options)

  const variables = (environmentVariables || []).map(variable => ({
    Namespace: 'aws:elasticbeanstalk:application:environment',
    OptionName: variable.name,
    Value: variable.value
  }))

  return {
    ApplicationName: app._id,
    EnvironmentName: `${app._id}-${environmentName}`,
    VersionLabel: versionLabel,
    Tier: {
      Name: 'WebServer',
      Type: 'Standard'
    },
    OptionSettings: [
      {
        Namespace: 'aws:elasticbeanstalk:cloudwatch:logs:health',
        OptionName: 'HealthStreamingEnabled',
        Value: 'true'
      },
      {
        Namespace: 'aws:elasticbeanstalk:environment',
        OptionName: 'LoadBalancerType',
        Value: 'application'
      },
      {
        Namespace: 'aws:autoscaling:asg',
        OptionName: 'MinSize',
        ResourceName: 'AWSEBAutoScalingGroup',
        Value: '1'
      },
      {
        Namespace: 'aws:autoscaling:asg',
        OptionName: 'MaxSize',
        ResourceName: 'AWSEBAutoScalingGroup',
        Value: '1'
      },
      {
        Namespace: 'aws:autoscaling:trigger',
        OptionName: 'LowerThreshold',
        ResourceName: 'AWSEBCloudwatchAlarmLow',
        Value: '20'
      },
      {
        Namespace: 'aws:autoscaling:trigger',
        OptionName: 'UpperThreshold',
        ResourceName: 'AWSEBCloudwatchAlarmHigh',
        Value: '60'
      },
      {
        Namespace: 'aws:autoscaling:trigger',
        OptionName: 'MeasureName',
        ResourceName: 'AWSEBCloudwatchAlarmLow',
        Value: 'CPUUtilization'
      },
      {
        Namespace: 'aws:autoscaling:trigger',
        OptionName: 'Statistic',
        ResourceName: 'AWSEBCloudwatchAlarmLow',
        Value: 'Average'
      },
      {
        Namespace: 'aws:autoscaling:trigger',
        OptionName: 'Unit',
        ResourceName: 'AWSEBCloudwatchAlarmLow',
        Value: 'Percent'
      },
      {
        Namespace: 'aws:autoscaling:launchconfiguration',
        OptionName: 'InstanceType',
        Value: 't2.micro'
      },
      {
        Namespace: 'aws:autoscaling:launchconfiguration',
        OptionName: 'IamInstanceProfile',
        Value: await getInstanceProfile({app})
      },
      {
        Namespace: 'aws:elasticbeanstalk:environment',
        OptionName: 'ServiceRole',
        Value: await getServiceRole({app})
      },
      {
        Namespace: 'aws:elasticbeanstalk:healthreporting:system',
        OptionName: 'SystemType',
        Value: 'enhanced'
      },
      ...platformOptions,
      ...variables
    ],
    SolutionStackName: await getSolutionStackName({app})
  }
}
