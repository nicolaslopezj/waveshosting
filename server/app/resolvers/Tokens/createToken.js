import {resolver, generateId} from '@orion-js/app'
import {getOptions} from '@orion-js/auth'
import Users from 'app/collections/Users'
import Token from 'app/models/Token'

export default resolver({
  returns: Token,
  mutation: true,
  async resolve(params, viewer) {
    const user = await Users.findOne(viewer.userId)
    if (!user) throw new Error('User not found')

    const {Sessions} = getOptions()

    const session = {
      publicKey: generateId() + generateId(),
      secretKey: generateId() + generateId() + generateId() + generateId(),
      createdAt: new Date(),
      nonce: {default: '0'},
      lastCall: new Date(),
      userId: user._id,
      locale: user.locale,
      roles: user.roles,
      emailVerified: false,
      options: {token: true}
    }

    const sessionId = await Sessions.insert(session)
    session._id = sessionId

    return session
  }
})
