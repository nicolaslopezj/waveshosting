import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import App from 'app/models/App'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    userId: {
      type: String
    }
  },
  returns: App,
  mutation: true,
  async checkPermission({appId}, viewer) {
    if (viewer.roles.includes('admin')) return
    const app = await Apps.findOne(appId)
    if (app.userId !== viewer.userId) {
      return 'unauthorized'
    }
  },
  async resolve({appId, userId}, viewer) {
    const app = await Apps.findOne(appId)
    app.update({$pull: {collaboratorsIds: userId}})
    return app
  }
})
