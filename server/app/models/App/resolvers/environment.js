import {resolver} from '@orion-js/app'
import Environment from 'app/models/Environment'
import init from 'app/models/Environment/init'

export default resolver({
  params: {
    environmentName: {
      type: String
    }
  },
  returns: Environment,
  cache: 500,
  async resolve(app, {environmentName}, viewer) {
    const beanstalk = await app.beanstalk()
    const {Environments: items} = await beanstalk
      .describeEnvironments({ApplicationName: app._id, EnvironmentNames: [environmentName]})
      .promise()
    if (!items[0]) return null

    return init(items[0])
  }
})
