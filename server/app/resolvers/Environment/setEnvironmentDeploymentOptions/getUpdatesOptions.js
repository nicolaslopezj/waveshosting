export default function({deploymentPolicy, batchSize}) {
  if (deploymentPolicy === 'allAtOnce') {
    return [
      {
        Namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        OptionName: 'RollingUpdateEnabled',
        Value: 'false',
        ResourceName: 'AWSEBAutoScalingGroup'
      }
    ]
  } else if (deploymentPolicy === 'rolling' || deploymentPolicy === 'rollingWithAdditionalBatch') {
    return [
      {
        Namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        OptionName: 'MaxBatchSize',
        Value: `${batchSize}`,
        ResourceName: 'AWSEBAutoScalingGroup'
      },
      {
        Namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        OptionName: 'MinInstancesInService',
        Value: '1',
        ResourceName: 'AWSEBAutoScalingGroup'
      },
      {
        Namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        OptionName: 'RollingUpdateEnabled',
        Value: 'true',
        ResourceName: 'AWSEBAutoScalingGroup'
      },
      {
        Namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        OptionName: 'RollingUpdateType',
        ResourceName: 'AWSEBAutoScalingGroup',
        Value: 'Health'
      }
    ]
  } else if (deploymentPolicy === 'immutable') {
    return [
      {
        Namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        OptionName: 'RollingUpdateEnabled',
        Value: 'true',
        ResourceName: 'AWSEBAutoScalingGroup'
      },
      {
        Namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        OptionName: 'RollingUpdateType',
        ResourceName: 'AWSEBAutoScalingGroup',
        Value: 'Immutable'
      }
    ]
  }
}
