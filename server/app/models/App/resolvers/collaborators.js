import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import SafeUser from 'app/models/User/SafeUser'

export default resolver({
  params: {},
  returns: [SafeUser],
  async resolve({collaboratorsIds}, params, viewer) {
    const users = await Users.find({_id: {$in: collaboratorsIds || []}}).toArray()
    return Promise.all(users.map(user => user.safeUser()))
  }
})
