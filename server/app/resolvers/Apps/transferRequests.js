import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {},
  returns: ['ID'],
  async resolve(params, viewer) {
    const apps = await Apps.find({transferToId: viewer.userId}).toArray()
    return apps.map(app => app._id)
  }
})
