import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import Environment from 'app/models/Environment'
import init from 'app/models/Environment/init'
import getOptions from './getOptions'
import validateOptions from './validateOptions'
import checkAppPermission from 'app/helpers/checkAppPermission'
import environmentVariablesField from './environmentVariablesField'
import Users from 'app/collections/Users'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    versionLabel: {
      type: String
    },
    environmentName: {
      type: String,
      label: 'Environment name',
      validate(name) {
        if (!/^[a-z0-9-]+$/g.test(name)) return 'invalid'
      }
    },
    options: {
      type: 'blackbox',
      optional: true
    },
    environmentVariables: environmentVariablesField
  },
  returns: Environment,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  mutation: true,
  async resolve(
    {appId, environmentName, versionLabel, options: clientOptions, environmentVariables},
    viewer
  ) {
    const app = await Apps.findOne(appId)
    if (!app) throw new Error('App not found')
    const options = await validateOptions(clientOptions, app)

    const beanstalk = await app.beanstalk()

    try {
      const params = await getOptions({
        app,
        environmentName,
        versionLabel,
        options,
        environmentVariables
      })

      const environment = await beanstalk.createEnvironment(params).promise()

      const user = await Users.findOne(viewer.userId)
      await user.checkReferralStatus()

      return init(environment)
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
      if (error.code === 'ConfigurationValidationException') {
        console.log(error)
        throw new Error(error.message)
        // throw new Error(
        //   'We could not comunicate to AWS EC2, if your account is new you must wait up to 24 hours to activate. Check the AWS console for more information'
        // )
      }
      throw error
    }
  }
})
