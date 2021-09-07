import {paginatedResolver} from '@orion-js/app'
import StaticWebsites from 'app/collections/StaticWebsites'
import StaticWebsite from 'app/models/StaticWebsite'

export default paginatedResolver({
  returns: StaticWebsite,
  async getCursor(params, viewer) {
    const cursor = await StaticWebsites.find({userId: viewer.userId})
    cursor.sort({_id: 1})

    return cursor
  }
})
