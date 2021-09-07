import {resolver} from '@orion-js/app'
import Environment from 'app/models/Environment'
import resolve from './resolve'
import checkAppPermission from 'app/helpers/checkAppPermission'
import environmentVariablesField from '../createEnvironment/environmentVariablesField'

export default resolver({
  params: {
    appId: {
      type: String
    },
    environmentName: {
      type: String
    },
    environmentVariables: environmentVariablesField
  },
  returns: Environment,
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  resolve
})
