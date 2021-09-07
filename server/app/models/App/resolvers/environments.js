import {resolver} from '@orion-js/app'
import Environment from 'app/models/Environment'
import init from 'app/models/Environment/init'

export default resolver({
  returns: [Environment],
  cache: 500,
  async resolve(app, params, viewer) {
    const beanstalk = await app.beanstalk()
    const {Environments: items} = await beanstalk
      .describeEnvironments({ApplicationName: app._id})
      .promise()
    const environments = items.map(env => init(env)).filter(env => env.status !== 'Terminated')
    return environments.sort((a, b) => a.name.localeCompare(b.name))
  }
})
