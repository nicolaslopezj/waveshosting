import {resolver, generateId} from '@orion-js/app'
import User from 'app/models/User'
import Users from 'app/collections/Users'

export default resolver({
  params: {
    userId: {
      type: 'ID'
    }
  },
  returns: User,
  mutation: true,
  checkPermission({userId}, viewer) {
    if (userId !== viewer.userId) return 'unauthorized'
  },
  async resolve({userId}, viewer) {
    const referralCode = generateId().slice(0, 8)
    const user = await Users.findOne(userId)
    await user.update({$set: {referralCode}})

    return user
  }
})
