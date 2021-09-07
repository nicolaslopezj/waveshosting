import {paginatedResolver} from '@orion-js/app'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'

export default paginatedResolver({
  params: {
    userId: {
      type: 'ID',
      optional: true
    }
  },
  returns: App,
  async checkPermission({userId, collaboratorsIds}, viewer) {
    if (viewer.roles.includes('admin')) return
    if (userId !== viewer.userId && !(collaboratorsIds || []).includes(viewer.userId)) {
      return 'unauthorized'
    }
  },
  async getCursor({userId}, viewer) {
    const query = userId ? {$or: [{userId}, {collaboratorsIds: viewer.userId}]} : {}
    const cursor = Apps.find(query)
    cursor.sort({_id: 1})

    return cursor
  }
})
