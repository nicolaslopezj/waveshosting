import {resolver} from '@orion-js/app'
import escape from 'escape-string-regexp'

export default resolver({
  returns: String,
  async resolve(environment, params, viewer) {
    return environment.name.replace(new RegExp(`^${escape(environment.appId + '-')}`), '')
  }
})
