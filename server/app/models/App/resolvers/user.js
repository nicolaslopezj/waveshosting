import {resolver} from '@orion-js/app'
import User from 'app/models/User'
import Users from 'app/collections/Users'

export default resolver({
  returns: User,
  async resolve(app, params, viewer) {
    return await Users.findOne(app.userId)
  }
})
