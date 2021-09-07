import {resolver} from '@orion-js/app'
import crypto from 'crypto'

export default resolver({
  returns: String,
  async resolve(user, params, viewer) {
    if (user._id !== viewer.userId) throw new Error('Only fetch your hash')
    const key = process.env.INTERCOM_SECRET_KEY
    const hash = crypto.createHmac('sha256', key).update(user._id)
    return hash.digest('hex')
  }
})
