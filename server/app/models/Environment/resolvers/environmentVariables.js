import {resolver} from '@orion-js/app'
import EnvironmentVariable from 'app/models/EnvironmentVariable'

export default resolver({
  returns: [EnvironmentVariable],
  async resolve(environment, params, viewer) {
    const app = await environment.app()
    const beanstalk = await app.beanstalk()
    const result = await beanstalk
      .describeConfigurationSettings({
        ApplicationName: environment.appId,
        EnvironmentName: environment.name
      })
      .promise()
    if (!result) return []

    const settings = result.ConfigurationSettings[0]
    if (!settings) return []
    return settings.OptionSettings.filter(setting => {
      return setting.Namespace === 'aws:elasticbeanstalk:application:environment'
    }).map(variable => {
      return {name: variable.OptionName, value: variable.Value.replace(/\\"/g, '"')}
    })
  }
})
