import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(environment, params, viewer) {
    return environment.awsCNAME
  }
})
