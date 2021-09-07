import {resolver} from '@orion-js/app'
import getApp from 'app/resolvers/Apps/app'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: 'blackbox',
  async resolve(platform, {appId}, viewer) {
    const app = await getApp({appId}, viewer)
    if (!app) throw new Error('App not found')
    if (!platform.getDefaultOptions) return {}
    return await platform.getDefaultOptions(app)
  }
})
