import {resolver} from '@orion-js/app'
import Platform from 'app/models/Platform'
import platforms from 'app/helpers/platforms'

export default resolver({
  returns: Platform,
  async resolve(app, params, viewer) {
    const {platformId} = app
    return platforms[platformId]
  }
})
