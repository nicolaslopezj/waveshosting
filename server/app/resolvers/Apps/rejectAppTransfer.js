import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  async resolve({appId}, viewer) {
    const app = await Apps.findOne(appId)
    if (app.transferToId !== viewer.userId) throw new Error('The invitation was not sent to you')

    await app.update({$set: {transferToId: null}})

    return true
  }
})
