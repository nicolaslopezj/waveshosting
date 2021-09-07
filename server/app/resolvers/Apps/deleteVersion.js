import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import App from 'app/models/App'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    version: {
      type: String
    }
  },
  returns: App,
  mutation: true,
  async resolve({appId, version}, viewer) {
    const app = await Apps.findOne(appId)

    const beanstalk = await app.beanstalk()
    const params = {
      ApplicationName: appId,
      DeleteSourceBundle: true,
      VersionLabel: version
    }

    const result = await beanstalk.deleteApplicationVersion(params).promise()

    console.log(result)

    return app
  }
})
