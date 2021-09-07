import {resolver} from '@orion-js/app'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: App,
  mutation: true,
  async resolve({appId, to}, viewer) {
    const app = await Apps.findOne(appId)
    if (viewer.userId !== app.userId) throw new Error('Only the owner can transfer an app')

    await app.update({$set: {transferToId: null}})

    return app
  }
})
