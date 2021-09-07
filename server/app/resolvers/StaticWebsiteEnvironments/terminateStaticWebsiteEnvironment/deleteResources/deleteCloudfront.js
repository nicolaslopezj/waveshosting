export default async function(environment) {
  if (!environment.distributionId) return

  const cloudfront = await environment.cloudfront()

  const {Distribution, ETag} = await cloudfront
    .getDistribution({Id: environment.distributionId})
    .promise()

  if (Distribution.Status !== 'Deployed') {
    throw new Error('Environment is not ready to terminate')
  }

  if (Distribution.DistributionConfig.Enabled) {
    throw new Error('Environment must be disabled to terminate')
  }

  await cloudfront
    .deleteDistribution({
      Id: environment.distributionId,
      IfMatch: ETag
    })
    .promise()

  await environment.update({$set: {distributionId: null}})
}
