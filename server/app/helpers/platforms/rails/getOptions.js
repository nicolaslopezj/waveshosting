export default async function({secretKey}) {
  return [
    {
      Namespace: 'aws:elasticbeanstalk:environment:process:default',
      OptionName: 'StickinessEnabled',
      ResourceName: 'AWSEBV2LoadBalancerTargetGroup',
      Value: 'true'
    },
    {
      Namespace: 'aws:elasticbeanstalk:application:environment',
      OptionName: 'SECRET_KEY_BASE',
      Value: secretKey
    }
  ]
}
