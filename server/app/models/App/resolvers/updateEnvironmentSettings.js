import {resolver} from '@orion-js/app'
import Environment from 'app/models/Environment'

export default resolver({
  params: {
    environmentName: {
      type: 'ID'
    },
    settings: {
      type: ['blackbox']
    }
  },
  returns: Environment,
  mutation: true,
  private: true,
  async resolve(app, {environmentName, settings}, viewer) {
    const beanstalk = await app.beanstalk()

    await beanstalk
      .updateEnvironment({
        ApplicationName: app._id,
        EnvironmentName: environmentName,
        OptionSettings: settings
      })
      .promise()

    return await app.environment({environmentName})
  }
})
