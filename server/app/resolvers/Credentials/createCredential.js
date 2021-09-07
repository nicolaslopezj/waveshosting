import {resolver} from '@orion-js/app'
import Credential from 'app/models/Credential'
import Credentials from 'app/collections/Credentials'

export default resolver({
  params: {
    name: {
      type: String,
      label: 'Give a name for this credential'
    },
    accessKeyId: {
      type: String,
      label: 'Access Key ID'
    },
    secretAccessKey: {
      type: String,
      label: 'Secret Access Key'
    }
  },
  returns: Credential,
  mutation: true,
  async resolve(params, viewer) {
    const credentialId = await Credentials.insert({
      ...params,
      userId: viewer.userId,
      createdAt: new Date()
    })

    return await Credentials.findOne(credentialId)
  }
})
