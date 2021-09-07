import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import Environment from 'app/models/Environment'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: String
    },
    retention: {
      type: Number
    }
  },
  returns: Environment,
  mutation: true,
  async resolve({appId, environmentName, retention}, viewer) {
    const app = await Apps.findOne(appId)

    const settings = [
      {
        Namespace: 'aws:elasticbeanstalk:cloudwatch:logs',
        OptionName: 'StreamLogs',
        Value: 'true'
      },
      {
        Namespace: 'aws:elasticbeanstalk:cloudwatch:logs',
        OptionName: 'RetentionInDays',
        Value: String(retention)
      }
    ]

    const env = await app.updateEnvironmentSettings({environmentName, settings})

    return env
  }
})
