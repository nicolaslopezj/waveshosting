import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'

export default resolver({
  returns: Boolean,
  mutation: true,
  async resolve(params, viewer) {
    const user = await Users.findOne(viewer.userId)
    await user.checkReferralStatus()
    return true
  }
})
