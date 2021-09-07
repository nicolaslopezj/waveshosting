import {resolver} from '@orion-js/app'

export default resolver({
  private: true,
  async resolve(environment, params, viewer) {
    if (environment._options) return environment._options

    const app = await environment.app()
    const beanstalk = await app.beanstalk()
    const result = await beanstalk
      .describeConfigurationSettings({
        ApplicationName: environment.appId,
        EnvironmentName: environment.name
      })
      .promise()

    if (!result || !result.ConfigurationSettings[0]) return null

    environment._options = result.ConfigurationSettings[0].OptionSettings

    return environment._options
  }
})
