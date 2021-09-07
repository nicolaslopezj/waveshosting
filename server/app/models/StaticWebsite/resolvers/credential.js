import {resolver} from '@orion-js/app'
import Credentials from 'app/collections/Credentials'
import Credential from 'app/models/Credential'

export default resolver({
  returns: Credential,
  async resolve(staticWebsite, params, viewer) {
    return await Credentials.findOne(staticWebsite.credentialId)
  }
})
