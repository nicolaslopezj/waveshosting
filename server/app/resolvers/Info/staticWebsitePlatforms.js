import {resolver} from '@orion-js/app'
import staticWebsitePlatforms from 'app/helpers/staticWebsitePlatforms'
import StaticWebsitePlatform from 'app/models/StaticWebsitePlatform'
import sortBy from 'lodash/sortBy'

export default resolver({
  returns: [StaticWebsitePlatform],
  async resolve(params, viewer) {
    return sortBy(Object.values(staticWebsitePlatforms), 'name')
  }
})
