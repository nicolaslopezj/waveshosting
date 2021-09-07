import {resolver} from '@orion-js/app'
import Credentials from 'app/collections/Credentials'
import Apps from 'app/collections/Apps'
import StaticWebsites from 'app/collections/StaticWebsites'

export default resolver({
  params: {
    credentialId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  async resolve({credentialId}, viewer) {
    if (await Apps.findOne({credentialId})) {
      throw new Error('Please delete all apps using this credential first')
    }

    if (await StaticWebsites.findOne({credentialId})) {
      throw new Error('Please delete all apps using this credential first')
    }

    await Credentials.remove(credentialId)

    return true
  }
})
