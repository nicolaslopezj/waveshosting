import {resolver} from '@orion-js/app'
import Credential from 'app/models/Credential'
import Credentials from 'app/collections/Credentials'

export default resolver({
  returns: [Credential],
  async resolve(params, viewer) {
    return await Credentials.find({userId: viewer.userId}).toArray()
  }
})
