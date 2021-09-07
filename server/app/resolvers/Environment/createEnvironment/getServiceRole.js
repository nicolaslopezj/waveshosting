import ensureRole from './ensureRole'

export default async function({app}) {
  const name = 'aws-elasticbeanstalk-waves-service-role'
  const policies = [
    'arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkService',
    'arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth'
  ]
  const policyDoc = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: '',
        Effect: 'Allow',
        Principal: {Service: ['elasticbeanstalk.amazonaws.com']},
        Action: ['sts:AssumeRole'],
        Condition: {StringEquals: {'sts:ExternalId': 'elasticbeanstalk'}}
      }
    ]
  }

  await ensureRole({app, name, policies, policyDoc})
  return name
}
