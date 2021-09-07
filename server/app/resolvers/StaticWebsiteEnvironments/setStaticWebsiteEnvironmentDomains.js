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
    domains: {
      type: [String]
    }
  },
  returns: StaticWebsiteEnvironment,
  checkPermission: checkStaticWebsitePermission,
  mutation: true,
  async resolve({environmentName, staticWebsiteId, domains}, viewer) {
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

    params.DistributionConfig.Aliases = {
      Quantity: domains.length,
      Items: domains
    }

    await cloudfront.updateDistribution(params).promise()

    return environment
  }
})
