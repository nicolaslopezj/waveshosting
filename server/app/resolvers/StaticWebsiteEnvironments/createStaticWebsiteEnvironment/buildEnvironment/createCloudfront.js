export default async function(environment) {
  const cloudfront = await environment.cloudfront()

  const params = {
    DistributionConfig: {
      Enabled: true,
      CallerReference: String(Number(new Date())),
      Comment: `Waves: ${environment.staticWebsiteId}-${environment.name}`,
      Aliases: {
        Quantity: 0
      },
      Origins: {
        Quantity: 1,
        Items: [
          {
            DomainName: `${environment.bucketName}.s3.amazonaws.com`,
            Id: `S3-${environment.bucketName}`,
            S3OriginConfig: {
              OriginAccessIdentity: ''
            }
          }
        ]
      },
      DefaultCacheBehavior: {
        ForwardedValues: {
          Cookies: {
            Forward: 'none'
          },
          QueryString: false
        },
        MinTTL: 0,
        TargetOriginId: `S3-${environment.bucketName}`,
        TrustedSigners: {
          Enabled: false,
          Quantity: 0
        },
        ViewerProtocolPolicy: 'allow-all'
      },
      CustomErrorResponses: {
        Quantity: 3,
        Items: [
          {
            ErrorCode: 400,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          },
          {
            ErrorCode: 403,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          },
          {
            ErrorCode: 404,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          }
        ]
      },
      DefaultRootObject: '/index.html',
      PriceClass: 'PriceClass_All'
    }
  }

  const {
    Distribution: {Id: distributionId}
  } = await cloudfront.createDistribution(params).promise()

  await environment.update({$set: {distributionId}})
}
