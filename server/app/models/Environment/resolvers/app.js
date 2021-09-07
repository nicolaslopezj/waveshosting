import {resolver} from '@orion-js/app'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'

export default resolver({
  returns: App,
  cache: 10000,
  async resolve(environment, params, viewer) {
    return await Apps.findOne(environment.appId)
  }
})
