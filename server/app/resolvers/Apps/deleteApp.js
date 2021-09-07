import {resolver} from '@orion-js/app'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'
import checkAppPermission from 'app/helpers/checkAppPermission'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    }
  },
  returns: App,
  mutation: true,
  requireTwoFactor: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId}, viewer) {
    const app = await Apps.findOne(appId)
    if (viewer.userId !== app.userId) throw new Error('Only the owner can delete an app')
    const environments = await app.environments()
    if (environments.length) throw new Error('App has environments running')
    const beanstalk = await app.beanstalk()

    await beanstalk.deleteApplication({ApplicationName: appId}).promise()
    app.remove({})

    return app
  }
})
