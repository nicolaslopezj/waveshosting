import {resolver} from '@orion-js/app'
import SafeUser from '../SafeUser'

export default resolver({
  returns: SafeUser,
  async resolve(user, params, viewer) {
    return {
      _id: user._id,
      name: await user.name(),
      email: await user.email()
    }
  }
})
