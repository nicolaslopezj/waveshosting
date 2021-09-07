import {resolver} from '@orion-js/app'
import Credential from 'app/models/Credential'

export default resolver({
  returns: Credential,
  cache: 10000,
  async resolve(staticWebsiteEnvironment, params, viewer) {
    const staticWebsite = await staticWebsiteEnvironment.staticWebsite()
    return await staticWebsite.credential()
  }
})
