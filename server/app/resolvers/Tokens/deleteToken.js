import {resolver} from '@orion-js/app'
import {getOptions} from '@orion-js/auth'

export default resolver({
  params: {
    tokenId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  async resolve({tokenId}, viewer) {
    const {Sessions} = getOptions()
    await Sessions.remove({
      _id: tokenId,
      userId: viewer.userId,
      'options.token': true
    })
    return true
  }
})
