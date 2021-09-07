import {resolver} from '@orion-js/app'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'
import checkAppPermission from 'app/helpers/checkAppPermission'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: App,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId}, viewer) {
    return await Apps.findOne(appId)
  }
})
