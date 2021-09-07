import {resolver} from '@orion-js/app'

export default resolver({
  returns: [String],
  async resolve(staticWebsiteEnvironment, params, viewer) {
    const config = await staticWebsiteEnvironment.getDistributionConfig()
    const {Quantity, Items} = config.DistributionConfig.Aliases
    if (Quantity) {
      return Items
    } else {
      return []
    }
  }
})
