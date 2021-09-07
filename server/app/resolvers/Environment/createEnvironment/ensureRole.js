import AWS from 'aws-sdk'

export default async function({app, name, policyDoc, policies}) {
  const {accessKeyId, secretAccessKey} = await app.credential()
  const iam = new AWS.IAM({accessKeyId, secretAccessKey})
  try {
    await iam.getRole({RoleName: name}).promise()
    return
  } catch (error) {
    if (error.code !== 'NoSuchEntity') {
      throw error
    }
  }

  const params = {
    AssumeRolePolicyDocument: JSON.stringify(policyDoc),
    RoleName: name,
    Description: 'Created by waveshosting.com',
    MaxSessionDuration: 3600
  }

  await iam.createRole(params).promise()
  for (const policy of policies) {
    await iam
      .attachRolePolicy({
        PolicyArn: policy,
        RoleName: name
      })
      .promise()
  }
}
