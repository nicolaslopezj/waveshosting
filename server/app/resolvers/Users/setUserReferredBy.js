import {resolver} from '@orion-js/app'
import User from 'app/models/User'
import Users from 'app/collections/Users'
import moment from 'moment'

export default resolver({
  params: {
    userId: {
      type: 'ID'
    },
    referralCode: {
      type: String
    }
  },
  returns: User,
  mutation: true,
  checkPermission({userId}, viewer) {
    if (userId !== viewer.userId) return 'unauthorized'
  },
  async resolve({userId, referralCode}, viewer) {
    const user = await Users.findOne(userId)
    if (user.referredById) {
      throw new Error('User is already referred')
    }

    for (const email of user.emails) {
      if (!email.verified) {
        throw new Error('You must verify your email first')
      }
    }

    if (moment(user.createdAt).isBefore(moment().subtract(1, 'day'))) {
      throw new Error('You must add the referral code the same day you register')
    }

    const referrer = await Users.findOne({referralCode})

    if (!referrer) {
      throw new Error('The code is incorrect')
    }

    if (referrer._id === user._id) {
      throw new Error('You can add yourself')
    }

    await user.update({$set: {referredById: referrer._id}})

    await user.checkReferralStatus()

    return user
  }
})
