import {resolver} from '@orion-js/app'
import Platform from 'app/models/Platform'
import staticWebsitePlatforms from 'app/helpers/staticWebsitePlatforms'

export default resolver({
  returns: Platform,
  async resolve(staticWebsite, params, viewer) {
    const {platformId} = staticWebsite
    return staticWebsitePlatforms[platformId]
  }
})
