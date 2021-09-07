import {resolver} from '@orion-js/app'
import LogsOptions from '../LogsOptions'

export default resolver({
  returns: LogsOptions,
  cache: 2000,
  async resolve(environment, params, viewer) {
    const active =
      (await environment.option({
        namespace: 'aws:elasticbeanstalk:cloudwatch:logs',
        optionName: 'StreamLogs'
      })) === 'true'

    const options = {
      active,
      retention: Number(
        await environment.option({
          namespace: 'aws:elasticbeanstalk:cloudwatch:logs',
          optionName: 'RetentionInDays'
        })
      ),
      logGroups: []
    }

    if (active) {
      const app = await environment.app()
      const cloudwatchlogs = await app.cloudwatchlogs()
      const prefix = `/aws/elasticbeanstalk/${environment.name}/`
      const {logGroups} = await cloudwatchlogs
        .describeLogGroups({logGroupNamePrefix: prefix})
        .promise()
      options.logGroups = logGroups.map(group => {
        return {
          ...group,
          name: group.logGroupName
            .replace(prefix, '')
            .replace('var/log/', '')
            .replace('.log', '')
        }
      })
    }

    return options
  }
})
