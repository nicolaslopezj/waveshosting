import {resolver} from '@orion-js/app'
import Token from 'app/models/Token'
import {getOptions} from '@orion-js/auth'

export default resolver({
  params: {
    tokenId: {
      type: 'ID'
    },
    name: {
      type: String,
      optional: true
    }
  },
  returns: Token,
  mutation: true,
  async resolve({tokenId, name}, viewer) {
    const {Sessions} = getOptions()
    const token = await Sessions.findOne({
      _id: tokenId,
      userId: viewer.userId,
      'options.token': true
    })
    if (!token) throw new Error('Token was not found')
    if (name) {
      await token.update({$set: {'options.name': name}})
    } else {
      await token.update({$unset: {'options.name': name}})
    }
    token.options.name = name
    return token
  }
})
