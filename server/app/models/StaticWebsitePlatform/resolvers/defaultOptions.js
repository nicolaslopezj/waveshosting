import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: 'blackbox',
  async resolve(platform, {appId}, viewer) {
    const app = await Apps.findOne({_id: appId, userId: viewer.userId})
    if (!app) throw new Error('App not found')
    if (!platform.getDefaultOptions) return {}
    return await platform.getDefaultOptions(app)
  }
})
