import ensureRole from './ensureRole'
import AWS from 'aws-sdk'

export default async function({app}) {
  const roleName = 'aws-elasticbeanstalk-waves-ec2-role'
  const policies = [
    'arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier',
    'arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker',
    'arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier'
  ]
  const policyDoc = {
    Version: '2012-10-17',
    Statement: [
      {Effect: 'Allow', Action: ['sts:AssumeRole'], Principal: {Service: ['ec2.amazonaws.com']}}
    ]
  }

  await ensureRole({app, name: roleName, policies, policyDoc})

  const {accessKeyId, secretAccessKey} = await app.credential()
  const iam = new AWS.IAM({accessKeyId, secretAccessKey})

  const profileName = 'aws-elasticbeanstalk-waves-ec2-profile'

  try {
    await iam.createInstanceProfile({InstanceProfileName: profileName}).promise()
    await iam
      .addRoleToInstanceProfile({
        InstanceProfileName: profileName,
        RoleName: roleName
      })
      .promise()

    return profileName
  } catch (error) {
    if (error.code !== 'EntityAlreadyExists') {
      throw error
    }
    return profileName
  }
}
