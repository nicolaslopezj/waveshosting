import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import SafeUser from 'app/models/User/SafeUser'

export default resolver({
  params: {},
  returns: SafeUser,
  async resolve(app, params, viewer) {
    const user = await Users.findOne({_id: app.userId})
    return await user.safeUser()
  }
})
