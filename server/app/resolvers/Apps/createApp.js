import {resolver} from '@orion-js/app'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'
import Credentials from 'app/collections/Credentials'
import AWS from 'aws-sdk'
import canCreateAnApp from 'app/resolvers/Subscription/canCreateAnApp'

export default resolver({
  params: {
    _id: {
      type: 'ID',
      label: 'Name',
      description: 'A name for this app',
      validate(name) {
        if (!/^[a-z0-9-]+$/g.test(name)) return 'invalid'
      }
    },
    credentialId: {
      type: String,
      label: 'Credential',
      description: 'Which credential you want to use in this app',
      async custom(credentialId, info, viewer) {
        const count = await Credentials.find({userId: viewer.userId, _id: credentialId}).count()
        if (!count) return 'notFound'
      }
    },
    region: App.schema.region,
    platformId: App.schema.platformId
  },
  returns: App,
  mutation: true,
  async resolve({_id, region, credentialId, platformId}, viewer) {
    const canCreateAnAppResult = await canCreateAnApp({}, viewer)
    if (!canCreateAnAppResult) throw new Error('You must have an active subscription')
    const userId = viewer.userId
    const credential = await Credentials.findOne({userId: userId, _id: credentialId})

    const beanstalk = new AWS.ElasticBeanstalk({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region
    })

    try {
      await beanstalk
        .createApplication({
          ApplicationName: _id,
          Description: 'App created with Waves hosting'
        })
        .promise()
    } catch (error) {
      if (error.message === `Application ${_id} already exists.`) {
        console.log(`Will add app existing app ${_id}`)
      } else {
        throw error
      }
    }

    const appId = await Apps.insert({
      _id,
      region,
      credentialId,
      platformId,
      userId,
      createdAt: new Date()
    })

    return await Apps.findOne(appId)
  }
})
