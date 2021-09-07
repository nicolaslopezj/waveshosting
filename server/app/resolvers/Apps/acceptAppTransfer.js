import {resolver} from '@orion-js/app'
import Credentials from 'app/collections/Credentials'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    credentialId: {
      type: String,
      label: 'Credential',
      description: 'Which credential you want to use in this app',
      async custom(credentialId, {doc}, viewer) {
        if (!doc.appId) return 'notFound'
        const credential = await Credentials.findOne({userId: viewer.userId, _id: credentialId})
        if (!credential) return 'notFound'

        const app = await Apps.findOne(doc.appId)

        const beanstalk = await credential.aws({service: 'ElasticBeanstalk', region: app.region})
        try {
          const result = await beanstalk
            .describeApplications({
              ApplicationNames: [doc.appId]
            })
            .promise()
          if (!result.Applications.length) return 'incorrectCredentialForApp'
        } catch (error) {
          return 'incorrectCredentialForApp'
        }
      }
    }
  },
  returns: App,
  mutation: true,
  requireTwoFactor: true,
  async resolve({appId, credentialId}, viewer) {
    const app = await Apps.findOne(appId)
    if (app.transferToId !== viewer.userId) throw new Error('The invitation was not sent to you')

    await app.update({
      $set: {
        transferToId: null,
        userId: app.transferToId,
        credentialId
      }
    })

    return app
  }
})
