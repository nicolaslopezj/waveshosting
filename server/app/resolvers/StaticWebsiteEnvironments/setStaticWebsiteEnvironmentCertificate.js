import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'
import {resolver} from '@orion-js/app'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'

export default resolver({
  params: {
    environmentName: {
      type: 'ID'
    },
    staticWebsiteId: {
      type: 'ID'
    },
    certificateId: {
      type: 'ID',
      optional: true
    }
  },
  returns: StaticWebsiteEnvironment,
  checkPermission: checkStaticWebsitePermission,
  mutation: true,
  async resolve({environmentName, staticWebsiteId, certificateId}, viewer) {
    const environment = await StaticWebsiteEnvironments.findOne({
      name: environmentName,
      staticWebsiteId
    })
    const cloudfront = await environment.cloudfront()
    const config = await environment.getDistributionConfig()

    const params = {
      Id: environment.distributionId,
      IfMatch: config.ETag,
      DistributionConfig: config.DistributionConfig
    }

    if (certificateId) {
      params.DistributionConfig.ViewerCertificate = {
        ACMCertificateArn: certificateId,
        Certificate: certificateId,
        CertificateSource: 'acm',
        MinimumProtocolVersion: 'TLSv1.1_2016',
        SSLSupportMethod: 'sni-only'
      }
    } else {
      params.DistributionConfig.ViewerCertificate = {
        CloudFrontDefaultCertificate: true,
        MinimumProtocolVersion: 'TLSv1',
        CertificateSource: 'cloudfront'
      }
    }

    await cloudfront.updateDistribution(params).promise()

    return environment
  }
})
