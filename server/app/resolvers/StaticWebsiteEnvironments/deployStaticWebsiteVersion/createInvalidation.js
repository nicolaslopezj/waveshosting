export default async function({fileNames, credential, environment, version}) {
  const cloudfront = await credential.aws({service: 'CloudFront'})

  const params = {
    DistributionId: environment.distributionId,
    InvalidationBatch: {
      CallerReference: 'waves-deploy-version-' + new Date().getTime(),
      Paths: {
        Quantity: 1,
        Items: ['/*']
      }
    }
  }

  await cloudfront.createInvalidation(params).promise()
}
